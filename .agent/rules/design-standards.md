---
trigger: model_decision
description: Defines UI/UX standards using Next.js, Tailwind & Shadcn. Mandates semantic tokens (no hex), mobile-first strategies (Tables→Cards), and specific states (Skeletons, Error, Empty). Strict rules for A11y, layout, typography & cn() utility.
---

### Frontend Design Standards

## Descripcion
Este documento actúa como la **Fuente de Verdad** para el diseño, UI/UX y estilización. El Agente debe seguir estas reglas estrictamente al generar código. Se utiliza el stack: **Next.js, TailwindCSS, Lucide React y Shadcn/UI**.

## **1. Principios Core de UI/UX**
* **Claridad sobre creatividad:** La funcionalidad y legibilidad tienen prioridad sobre la decoración.
* **Jerarquía Tipográfica Estricta:**
    * `h1`: Texto principal, `text-3xl` a `text-4xl`, `font-bold`, `tracking-tight`.
    * `h2`/`h3`: Subtítulos, `text-xl` a `text-2xl`, `font-semibold`.
    * `p` / `body`: Texto base, `text-base` o `text-sm`, `text-muted-foreground` para descripciones.
* **Feedback Visual:** Todo elemento interactivo debe tener estados `:hover`, `:active` y `:focus-visible`.
* **Accesibilidad (A11y):**
    * Usar etiquetas HTML semánticas (`<section>`, `<article>`, `<main>`).
    * Todos los inputs deben tener `aria-label` si no tienen label visible.
    * Contraste mínimo WCAG AA.

## **2. Sistema de Diseño & Shadcn/UI**
* **Regla de Oro:** NO crear componentes desde cero si existe uno en Shadcn/UI. Añadirlos usando los comandos de shadcn.
    * Ejemplo: `bunx --bun shadcn@latest add dropdown-menu`
* **Instalación:** Asumir que los componentes están en `@/components/ui`.
* **Personalización:**
    * No editar archivos en `components/ui/*` directamente a menos que sea para cambiar la configuración global.
    * Usar `className` props para sobrescribir estilos en instancias específicas.
* **Iconografía:** Usar exclusivamente **Lucide React**.
    * Tamaño estándar: `h-4 w-4` (botones pequeños) o `h-5 w-5` (estándar).

## **3. TailwindCSS & Estilizado**
* **Uso de Variables CSS (Theming):**
    * **NUNCA** usar colores hex (`#ffffff`) o colores default de Tailwind (`bg-blue-500`) para estructura.
    * **SIEMPRE** usar tokens semánticos de Shadcn:
        * Fondo: `bg-background`, `bg-muted`, `bg-card`.
        * Texto: `text-foreground`, `text-muted-foreground`.
        * Bordes: `border-input`, `border-border`.
        * Acciones: `bg-primary`, `text-primary-foreground`.
    * Esto garantiza soporte automático para **Dark Mode**.
* **Layouts:**
    * Preferir `flex` y `grid`.
    * Usar `gap` en lugar de márgenes entre elementos hijos.
* **Clases prohibidas:** Evitar valores arbitrarios como `w-[350px]` o `top-[12px]`. Usar la escala estándar (`w-72`, `top-3`).

## **4. Responsividad (Mobile-First Estricto)**
* **Estrategia:** Escribir primero las clases para móvil (sin prefijo) y luego añadir breakpoints (`md:`, `lg:`).
* **Breakpoints:**
    * `md` (768px): Tablet / Laptop pequeña.
    * `lg` (1024px): Desktop estándar.
* **Reglas de Scroll (Crucial):**
    * **GLOBAL (Prohibido):** El layout principal (`body` o `main`) **NUNCA** debe tener scroll horizontal.
    * **LOCAL (Permitido):** Los componentes de alta densidad (Tablas complejas, Bloques de código, Gráficos) deben estar contenidos en un div con `overflow-x-auto`.
* **Visualización de Datos en Móvil:**
    * **Opción A (Preferida):** Transformar filas de tablas en **Tarjetas (Cards)** verticales para mejor legibilidad.
    * **Opción B (Fallback):** Si la tabla debe mantener su estructura, usar un contenedor con scroll horizontal (`overflow-x-auto`) y asegurar que los encabezados sean legibles.
* **Estándar de Paneles (Detail & Edit):**
    * Visualizar detalles completos de un objeto o formularios de edición.
    * **Componente:** Reutilizar el componente `<Drawer>` de shadcn/ui.
    * **Comportamiento:**
        * **Mobile:** Ocupa el ancho completo o gran parte de la pantalla.
        * **Desktop:** Panel lateral derecho (`side="right"`).
    * *Nota:* Esto mantiene la consistencia visual y de código entre dispositivos.

## **5. Manejo de Estados (Loading, Error & Empty)**
### **A. Carga Inicial (Page Load)**
* **Patrón:** Usar `Suspense` envolviendo el contenido asíncrono.
* **Skeletons Contextuales:**
* **Prohibido:** Usar un `Skeleton` genérico o una sola línea.
* **Obligatorio:** Crear un componente Skeleton que **imite la estructura final** para evitar Layout Shift.
* *Ejemplo:* Si carga una tabla, el skeleton debe tener filas y columnas. Si carga cards, debe ser una grilla de cards grises.

### **B. Acciones (Botones)**
* Al procesar, deshabilitar botón (`disabled={isLoading}`) y mostrar icono `Loader2` (`animate-spin`) al inicio.

### **C. Estados de Error Visuales**
* **Formularios:** Texto `text-sm text-destructive` debajo del input.
* **Carga de Sección:** Si falla un bloque de contenido (ej. Gráfico), mostrar un `Alert` variant `destructive` con el mensaje.

### **D. Estados Vacíos (Empty States)**
* Si una lista o tabla no tiene datos, **NUNCA** dejar el espacio en blanco.
* Mostrar componente centrado con:
1. Icono alusivo (grande, `text-muted-foreground`).
2. Título claro (ej. "No hay clientes registrados.").
3. (Opcional) Botón de acción (ej. "Crear nuevo").

## **6. Limpieza de Código (DX)**
* **Utilidad `cn()`:** Siempre usar `cn()` para fusionar clases condicionales.
    * *Correcto:* `className={cn("bg-red-500", isActive && "bg-blue-500")}`
* **Componentes Pequeños:** Extraer lógica visual repetitiva a componentes locales si se usa más de 2 veces.
* **Orden de Clases:** (Opcional pero recomendado) Layout → Box Model → Tipografía → Visuales → Interacción.
    * Ej: `flex flex-col p-4 text-sm bg-muted hover:bg-muted/80`.
