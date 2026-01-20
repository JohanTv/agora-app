---
trigger: model_decision
description: Mandates Result Pattern architecture. Services encapsulate logic/exceptions; Actions orchestrate. Hard ban on UI try/catch. Standardizes Prisma transactions, RHF+Arktype validation & Sonner feedback. Critical for robust UX & code.
---

# Error Handling Standards

## Descripción
Este documento rige estrictamente el manejo de errores y respuestas en la aplicación. El Agente debe seguir el **Result Pattern** para todo flujo de datos, eliminando el uso de `try/catch` en la capa de UI. Define la responsabilidad arquitectónica: los Servicios contienen la lógica y captura de excepciones (Backend), los Actions orquestan, y la UI renderiza feedback mediante Sonner (Sistema) y React Hook Form (Validación), asegurando una experiencia de usuario robusta y sin interrupciones.

## **1. Reglas Absolutas (Hard Rules)**
* **Uso Restringido de `try/catch`:**
  * **En UI (Frontend):** **PROHIBIDO**. El componente confía en recibir un `Result`.
  * **En Services (Lógica de Negocio):** **OBLIGATORIO**. Toda interacción con Prisma/DB o APIs externas debe estar envuelta en `try/catch`.
  * **En Server Actions (Controladores):** **OPCIONAL**. Solo necesario si el Action realiza orquestación compleja (validaciones manuales, lógica previa al servicio). Si solo delega al servicio, no es necesario re-envolver.
* **Tipado Estricto:** Tanto Actions como Services deben retornar `Promise<Result<T>>`.
* **Segregación de Errores:**
  * Errores de **Validación** (Formularios) → UI Inline.
  * Errores de **Sistema/Red** → Toast (Sonner).
* **Logs:** `console.error("[SCOPE]", error)` obligatorio en el `catch` del Service o Action.
* **Estándar de Mensajes (UX Writing):**
  * **Tono:** Debe ser amigable, empático y profesional. Jamás mostrar códigos de error técnicos (ej. *undefined*, *404*, *null*).
  * **Puntuación:** Es **obligatorio** que todo mensaje de error o éxito termine con un punto final (`.`).


## **2. El Result Pattern**
Archivo base: `@/types/result.types.ts`
El Agente debe tipar explícitamente el genérico `<T>` (el dato esperado en caso de éxito).

```ts
export interface Success<T> {
  success: true;
  value: T;
}

export interface Failure {
  success: false;
  error: string; // Mensaje amigable para el usuario
}

export type Result<T> = Success<T> | Failure;
```

## **3. Peticiones HTTP (REST API)**
**Contexto:** Uso exclusivo para consumir **API Routes** (ej. `/api/users`) o API externas.
**Herramienta:** `handleResponse` (Ya encapsula el manejo de errores).

**Código Fuente de Referencia (`@/utils/handle-response.ts`):**

```typescript
import { PROCESSING_ERROR } from "@/lib/constants";
import type { Result } from "@/types/result.types";

export async function handleResponse<T>(
  url: string,
  options: RequestInit,
): Promise<Result<T>> {
  try {
    const response = await fetch(url, options);
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
      const error =
        response.status === 401 || response.status === 500
          ? PROCESSING_ERROR
          : String(data?.message) || response.statusText;
      return {
        success: false,
        error: error,
      };
    }

    return {
      success: true,
      value: data,
    };
  } catch (error) {
    console.error("[API Exception]", {
      url,
      error,
    });

    return {
      success: false,
      error: PROCESSING_ERROR,
    };
  }
}

```

**Ejemplo de Consumo en Cliente:**
```typescript
// El Agente NO debe escribir try/catch aquí.
const result = await handleResponse<User>("/api/me", { method: "GET" });

if (!result.success) {
  toast.error(result.error);
  return;
}
console.log(result.value); // User
```

## **4. Arquitectura Backend (Actions & Services)**
El backend se divide en dos capas estrictas. El Agente debe respetar la responsabilidad de cada una.

### **A. Capa de Servicios (`*.service.ts`)**
**Responsabilidad:** Lógica de negocio pura, interacción con DB (Prisma) y manejo de excepciones crudas.
**Regla:** Aquí es **OBLIGATORIO** el `try/catch`.

```typescript
// services/user.service.ts
import { handleDbError } from "@/utils/handle-db-error";

export const create = async (data: CreateUserDTO): Promise<Result<User>> => {
  try {
    // Lógica de DB
    const user = await prisma.user.create({ data });

    return { success: true, value: user };
  } catch (error: unknown) {
    console.error("[CREATE_USER_SERVICE]", error); // Log técnico para depuración interna.
    return { success: false, error: "No se pudo crear el usuario." };
  }
};

```

### **B. Capa de Server Actions (`*.action.ts`)**
**Responsabilidad:** Autenticación, Validación de Inputs (Schema), Llamada al Servicio y Revalidación de Caché.
**Regla:** Actúa como orquestador. Retorna `Result`.

**Escenario 1: Action "Proxy" (Delegación Simple)**
Si solo expone un servicio público, no requiere `try/catch` ni validación extra.

```typescript
export async function getMessagesAction(conversationId: string) {
  return await ChatService.getConversationMessages(conversationId);
}

```

**Escenario 2: Action "Orquestador" (Auth + Validación + Mutación)**
Si requiere verificar permisos o validar datos antes de llamar al servicio.

```typescript
export async function createUserAction(data: UserInput): Promise<Result<User>> {
  try {
    // 1. Verificación de Seguridad (Auth)
    const session = await auth();
    if (session?.user.role !== "admin") {
      return { success: false, error: "No autorizado." };
    }

    // 2. Validación de Datos (Arktype/Zod)
    const validation = CreateUserSchema(data);
    if (validation instanceof type.errors) {
       return { success: false, error: "Datos inválidos." };
    }

    // 3. Llamada al Servicio (El servicio ya maneja sus propios errores)
    const result = await UserService.create(data);

    if (!result.success) return result;

    // 4. Efectos Secundarios (Revalidate)
    revalidatePath("/users");

    return result;

  } catch (error: unknown) {
    // Catch de seguridad por si falla 'auth()' o 'revalidatePath'
    console.error("[CREATE_USER_ACTION]", error);
    return { success: false, error: "No se pudo crear el usuario." };
  }
}
```
### **C. Consumo en Frontend (Client Components)**
A diferencia de REST, los Server Actions se importan como funciones.
**Regla Crítica:** No usar `handleResponse` ni `try/catch`. Si el Server Action falla por red (crash), el `error.tsx` global o el framework lo manejarán. El componente solo gestiona el `Result`.

```typescript
// components/user-create-form.tsx
const onSubmit = async (data: FormValues) => {
    // 1. Invocación Directa
    const result = await createUserAction(data);

    // 2. Guard Clause (Lógica de Negocio)
    if (!result.success) {
        toast.error(result.error);
        return;
    }

    // 3. Éxito
    toast.success("Usuario creado con éxito.");
};
```

## **5. UX Writing y Feedback Visual**
### **A. Estándar de Mensajes ("Friendly Feedback")**
Los mensajes deben instruir al usuario sobre cómo solucionar el problema, evitando tecnicismos.

* ✅ "El teléfono debe tener al menos 9 dígitos."
* ❌ "Error: phone string too short."
* ❌ "Campo inválido."

**Reglas de Redacción:**
1. **Claridad:** Qué falta o qué falló sin culpar al usuario.
2. **Puntuación:** Obligatorio terminar con punto final (`.`).
3. **Idioma:** Español neutro.

### **B. Canales de Error**
* **Toast (`sonner`):** Solo para `result.error` (Fallos de servidor, conexión, o lógica de negocio global).
* **Inline (`RHF errors`):** Exclusivo para validaciones de campos (Email inválido, contraseña corta).
  * **Regla:** Nunca usar Toasts para decir "El email es inválido". Usar los mensajes de error de React Hook Form.
  * **Estilo:** Texto `text-sm`, color `text-destructive` (variable de shadcn), ubicado inmediatamente debajo del input.


## **6. Formularios (RHF + Arktype)**
El stack de formularios es estricto: **React Hook Form** manejado por **Arktype**.

**Requisitos para el Agente:**
1.  Definir el esquema con `type` (Arktype).
2.  Inferir el tipo TypeScript del esquema.
3.  Usar `arktypeResolver` (de `@hookform/resolvers/arktype`).
4.  Usar `.configure({ message: "..." })` para definir los mensajes amigables.

**Snippet Maestro para Formularios:**

```tsx
import { useForm } from "react-hook-form";
import { type } from "arktype";
import { arktypeResolver } from "@hookform/resolvers/arktype";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

// 1. Definición del Esquema
const schema = type({
  email: type("string.email").configure({
    message: "Introduce un correo electrónico válido.",
  }),
  password: type("string>=8").configure({
    message: "La contraseña debe tener al menos 8 caracteres.",
  }),
});

// 2. Inferencia de Tipos
type FormValues = typeof schema.infer;

export function LoginForm() {
  // 3. Hook con Resolver
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: arktypeResolver(schema),
  });

  // 4. Handler
  const onSubmit = async (data: FormValues) => {
    const result = await handleResponse("/api/login", {
      method: "POST",
      body: JSON.stringify(data),
    });

    // Error de API -> Toast
    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success("Bienvenido.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input {...register("email")} placeholder="Email" />
        {/* Error de Validación -> Inline */}
        {errors.email && (
          <p className="text-sm text-destructive">{String(errors.email.message)}</p>
        )}
      </div>
      {/* ... */}
    </form>
  );
}
```

## **7. Manejo de Transacciones (Prisma)**
**Ubicación:** Capa de Servicios (`*.service.ts`).

Cuando se utilice `db.$transaction`, **es obligatorio lanzar un error (`throw new Error`)** dentro de la transacción para abortar la operación si una regla de negocio no se cumple. El bloque `try/catch` del servicio capturará este error y lo convertirá al formato `Failure` del Result Pattern. El **Manejo de Excepciones**, se debe utilizar la función de utilidad `getErrorMessage()` para extraer el mensaje del error. Revisar el archivo `@/utils/format-error`.


**Ejemplo Correcto:**
```typescript
import { getErrorMessage } from "@/utils/format-error";

// ✅ CORRECTO: El throw fuerza el Rollback, el catch lo formatea.
export const updateBalance = async (userId: string, amount: number): Promise<Result<void>> => {
  try {
    await db.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { id: userId } });
      if (!user) throw new Error("Usuario no encontrado");

      if (user.balance < amount) {
        // Lanzamos error para cancelar la transacción inmediatamente
        throw new Error("Saldo insuficiente para la operación.");
      }

      await tx.user.update({ ... });
    });

    return { success: true, value: undefined };
  } catch (error: unknown) {
    console.error("[UPDATE_BALANCE_USER_SERVICE]", error);
    return {
      success: false,
      error: getErrorMessage(error, "Error en la transacción.")
    };
  }
}
```

**Ejemplo Incorrecto (Anti-patrón):**
```typescript
// ❌ INCORRECTO: El return dentro de la transacción hace COMMIT.
await db.$transaction(async (tx) => {
  if (!user) {
    return { success: false, error: "..." }; // Prisma guarda cambios y sigue
  }
});
```

## **8. Checklist de Verificación**
Antes de generar código, el Agente debe verificar:
1. ¿Estoy usando `try/catch` en la UI? → **Eliminarlo.**
2. ¿Es una API Externa? → **Usar `handleResponse`.**
3. ¿Es un Server Action Propio? → **Llamada directa + verificar `.success`.**
4. ¿Si falla la API, estoy mostrando un Toast? → **Sí.**
5. ¿Si falla la validación del input, estoy usando el objeto `errors` de RHF? → **Sí.**
6. ¿Estoy tipando el retorno como `Result<T>`? → **Sí.**