---
trigger: model_decision
description: Defines strict Type/Schema standards for CRUD. Mandates ArkType validation (Messages in Spanish) for Inputs (Create/Update) & Form handling. Enforces native Prisma types for Reads (List/Get). Critical for type safety, folder structure & naming.
---

# **Types & Schemas Standards (ArkType)**

## **Descripción**
Este documento es la **Fuente de Verdad** para la definición de datos. Utilizamos **ArkType** por su rendimiento y sintaxis.
El Agente debe seguir una política estricta: **Validación exhaustiva para escrituras (Write)** y **Reutilización de tipos de Prisma para lecturas (Read)**.

## **1. Reglas de Oro (Hard Rules)**
  * **Escritura (POST/PUT/PATCH):** Todo input del usuario debe tener un **Schema** definido en ArkType con mensajes de error personalizados y en español.
  * **Lectura (GET):** **NO** definir Schemas ni Tipos manuales para datos que vienen de la base de datos. Usar directamente los tipos generados por **Prisma** (`@prisma/client`).
  * **Sintaxis de Definición:**
      * Para validaciones simples sin mensaje: Usar strings (`"string >= 5"`).
      * Para validaciones con mensaje (Obligatorio en formularios): Usar `type("...").configure(...)`.
  * **Inferencia:** **NUNCA** escribir la interfaz de TypeScript manualmente para un Schema. Siempre usar `typeof schema.infer`.

## **2. Organización de Archivos**
Para mantener el proyecto ordenado, el Agente debe seguir estrictamente esta estructura de archivos:

* **Ubicación:** Todos los esquemas y tipos manuales deben residir en la carpeta raíz `@/types`.
* **Nomenclatura de Archivo:** El patrón es `[entidad].types.ts`.
* ✅ `types/user.types.ts`
* ✅ `types/product.types.ts`
* ❌ `types/user.schema.ts` (No usar suffix schema)
* ❌ `schemas/user.ts` (No crear carpeta schemas)

## **3. Convenciones de Nomenclatura (Variables)**
Dentro del archivo `.types.ts`, las variables exportadas deben seguir este patrón:

* **Creación (Schema):** `Create[Entidad]Schema` (Ej. `CreateUserSchema`).
* **Actualización (Schema):** `Update[Entidad]Schema` (Ej. `UpdateUserSchema`).
* **Tipos Inferidos:** `Create[Entidad]` y `Update[Entidad]` (Sin el sufijo Schema).
* **Lectura (DB):** Usar `User`, `Product` (Importados directamente de Prisma, no se re-definen aquí).

## **4. Sintaxis y Validaciones (ArkType Cheatsheet)**
### **4.1. Validaciones con Mensajes (Standard)**
Para formularios y datos de entrada, el mensaje es obligatorio.
```ts
// Envolver en type() para configurar el mensaje
age: type("integer >= 18").configure({
    message: "Debes ser mayor de 18 años."
})
```

### **4.2. Strings y Patrones**
```ts
email: type("string.email"),
uuid:  type("string.uuid"),
phone: type("/^[0-9]{9}$/") // Regex explícito
```

## **5. Estrategia de Lectura (Prisma Integration)**
Para endpoints `GET` (Listar o Detalle), **no crear esquemas de validación** a menos que sea para validar una API externa. Confiar en la tipología de base de datos.

**Correcto:**
```tsx
import { User } from "@prisma/client"; // ✅ Tipos automáticos

function UserProfile({ user }: { user: User }) {
  return <div>{user.name}</div>;
}
```

**Incorrecto (Redundante):**
```ts
// ❌ No reinventar la rueda
export type UserReadType = {
    id: string;
    name: string;
    // ...
}
```

## **6. Ejemplo Completo: User Entity (Write Operations)**
El Agente debe generar el código siguiendo este patrón. Notar el uso de `.configure` para UX en español.

### **6.1. Definición (users.schema.ts)**
```ts
import { type } from "arktype";

// 1. CREATE SCHEMA (Validación fuerte + Mensajes)
export const CreateUserSchema = type({
    name: type("string >= 2").configure({
        message: "El nombre debe tener al menos 2 caracteres."
    }),
    email: type("email").configure({
        message: "Introduce un correo electrónico válido."
    }),
    // Enums con mensaje
    role: type("'admin' | 'user' | 'viewer'").configure({
        message: "Debes seleccionar un rol válido."
    }),
    // Opcionales también pueden tener validación de formato
    phoneNumber: type("string?").configure({
        message: "El teléfono debe ser texto válido."
    }),
    age: type("integer >= 18").configure({
        message: "Debes ser mayor de edad para registrarte."
    })
});

// 2. UPDATE SCHEMA (Parciales)
export const UpdateUserSchema = type({
    // En update, los campos son opcionales, pero si se envían, deben cumplir la regla
    name: type("string >= 2 | null").configure({
        message: "El nombre debe tener al menos 2 caracteres."
    }),
    role: type("'admin' | 'user' | 'viewer' | null").configure({
        message: "Rol no permitido."
    })
});

// 3. Inferencia de Tipos (Static)
export type CreateUser = typeof CreateUserSchema.infer;
export type UpdateUser = typeof UpdateUserSchema.infer;
```

-----

## **7. Checklist de Verificación**

Antes de aprobar el código:
1. [ ] **¿El archivo está en `/types` y termina en `.types.ts`?** → Verificar estructura.
2. [ ] **¿Es una operación de Escritura?** → Definir Schema con `type("...").configure({ message: "..." })`.
3. [ ] **¿Es una operación de Lectura?** → Usar tipo de `@prisma/client`. **NO** crear Schema.
4. [ ] **¿Están los mensajes en español?** → Verificar ortografía y tono amigable.
5. [ ] **¿Inferencia correcta?** → Se exporta `typeof X.infer`.