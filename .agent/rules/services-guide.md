---
trigger: model_decision
description: Enforces strict architecture: Services (server-only/DB), Actions (Client bridge/Mutations) & UI (Suspense). Mandates Result Pattern. Rules: Server Components call Services; Clients call Actions. Critical for Logic, DB & Data Fetching.
---

# **Services and Actions**

## Descripcion
Este documento define una arquitectura modular estricta, imponiendo una separación de capas inquebrantable: Servicios (lógica de negocio y acceso a BD blindado con server-only), Server Actions (controladores y puente exclusivo para el cliente) y UI (Server Components con Suspense). Establece que el cliente jamás accede a los servicios directamente, estandariza todas las respuestas mediante el Result Pattern para evitar excepciones no controladas y regula el flujo de datos: las mutaciones pasan por Actions, mientras que la carga inicial consume Servicios directamente. Funciona como un manual técnico con snippets y checklists obligatorios para garantizar seguridad, tipado estricto y rendimiento.

## **1. Propósito y Arquitectura**
La aplicación sigue una arquitectura monolítica modular sin API REST interna.

  * **Services (`services/`):** Lógica de negocio pura y acceso a BD. **NUNCA** accesible por el cliente.
  * **Actions (`actions/`):** Controladores. Exponen mutaciones y lecturas específicas al cliente.
  * **Server Components:** Hacen el *fetching* inicial llamando directo a `services/`. Usan `Suspense`.
  * **Client Components:** Si necesitan datos extra, llaman a `actions/`, nunca a `services/`.

## **2. Capa de Servicios (`services/`)**
**Reglas de Oro:**
  * **Strict:** `import 'server-only'` al inicio.
  * **Control:** Usar `try/catch` explícito en cada función.
  * **Retorno:** Siempre `Promise<Result<T>>`.
  * **Responsabilidad:** Validación de datos (Input), Operación en BD (Prisma), Mensajes de éxito/error.

```ts
// services/crop.service.ts
import 'server-only'; // 🔒 Protege el código del bundle del cliente

import prisma from "@/lib/prisma";
import { type } from "arktype";
import { CreateCropSchema, type CreateCrop } from "@/types/crop.schemas";
import type { Result } from "@/types/result.types";
import type { Crop } from "@prisma/client";

// 1. GET (List) - Lectura
export const getAll = async (): Promise<Result<Crop[]>> => {
  try {
    const data = await prisma.crop.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return { success: true, data };
  } catch (error: unknown) {
    console.error("[GET_ALL_CROP_SERVICE]", error);
    return {
      success: false,
      error: "No se pudo obtener la lista de cultivos."
    };
  }
};

// 2. CREATE - Escritura con Validación
export const create = async (input: CreateCrop): Promise<Result<Crop>> => {
  const validation = CreateCropSchema(input);
  if (validation instanceof type.errors) {
    return { success: false, error: validation.summary };
  }

  try {
    const data = await prisma.crop.create({ data: input });
    return { success: true, data, message: "Cultivo creado con éxito." };
  } catch (error: unknown) {
    console.error("[CREATE_CROP_SERVICE]", error);
    return {
      success: false,
      error: "No se pudo crear el cultivo."
    };
  }
};
```

-----

## **3. Capa de Server Actions (`actions/`)**
Actúan como puente seguro para los componentes del lado del cliente (`'use client'`).

### **3.1. Caso A: Mutaciones (Write)**
Para formularios, botones de borrar, etc. Manejan caché y redirección.

```ts
// actions/crop.actions.ts
'use server';

import * as CropService from "@/services/crop.service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { CreateCrop } from "@/types/crop.schemas";

export async function createCropAction(data: CreateCrop) {
  const result = await CropService.create(data);

  if (result.success) {
    revalidatePath('/dashboard/crops');
    redirect('/dashboard/crops');
  }

  // Si falla, devolvemos el result para que el componente muestre el error (toast)
  return result;
}
```

### **3.2. Caso B: Lecturas para el Cliente (Read Bridge)**

**¿Cuándo usar esto?** Cuando un componente interactivo (`'use client'`) necesita datos frescos **sin** recargar la página (ej: Filtros dinámicos, Infinite Scroll, Dropdowns en cascada).
* Como el cliente no puede importar `services/`, creamos un wrapper en `actions/`. No añadas los comentarios.

```ts
// actions/crop.actions.ts (continuación)

/**
 * Wrapper para permitir que un Client Component obtenga la lista
 * sin recargar la página.
 */
export async function getCropsClientSide() {
  return await CropService.getAll();
}
```

-----

## **4. Capa de UI: Server Components & Suspense**
Para la carga inicial de páginas, usamos el patrón **Suspense + Async Component**. Esto permite mostrar un *skeleton* o spinner mientras los datos llegan, mejorando la UX.

### **4.1. Patrón de Implementación**
1.  **Page (Layout/Container):** Define el `<Suspense>` y llama al componente asíncrono.
2.  **Async Component (Fetcher):** Llama al `Service`, obtiene el resultado y decide qué renderizar.
3.  **UI Component (Presentation):** Recibe los datos puros o el objeto `Result`.

<!-- end list -->

```tsx
// app/dashboard/crops/page.tsx
import { Suspense } from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { CropList } from "@/components/crops/crop-list";
import * as CropService from "@/services/crop.service";

// 1. Componente Async (Fetcher)
async function ShowCropsList() {
  // Llamada directa al servicio (Server-to-Server)
  const result = await CropService.getAll();

  // Delegamos la lógica de visualización al componente.
  return <CropList result={result} />;
}

// 2. Page Principal
export default function CropsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Listado de Cultivos</h1>

      <Suspense fallback={<LoadingSpinner />}>
        <ShowCropsList />
      </Suspense>
    </div>
  );
}
```

## **5. Checklist de Aprobación**

### Servicios

1.  [ ] **Server-Only:** ¿Tiene `import 'server-only'`?
2.  [ ] **Explicit:** ¿Usa `try/catch` envolviendo la llamada a Prisma?
3.  [ ] **Return:** ¿Retorna siempre `Promise<Result<T>>`?

### Actions

1.  [ ] **Context:** ¿Tiene `'use server'`?
2.  [ ] **Bridge:** Si un Client Component necesita leer datos, ¿existe un Action que envuelva al Service?
3.  [ ] **Mutations:** ¿Ejecuta `revalidatePath` tras cambios exitosos?

### UI (Pages)

1.  [ ] **Performance:** ¿Usa `<Suspense>` para envolver la llamada de datos?
2.  [ ] **Direct Access:** ¿La Page llama al `Service` (no al Action) para la carga inicial?
3.  [ ] **Error Handling:** ¿El componente verifica `result.success` antes de renderizar la data?