---
trigger: model_decision
description: Source of Truth for Structure & Stack. Defines Bun, Next.js 16, Prisma. Mandates Bun for ALL package ops (install, add, run) & Shadcn CLI (bunx). Maps /services, /actions, /lib responsibilities. Critical for file placement & conventions.
---

# Arquitectura del Proyecto & Estructura de Directorios
Este documento detalla la organización del código fuente para el Pascal Real Estate OS.

## Tech Stack
- **Runtime**: Bun
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4, Shadcn UI, Motion
  - **Regla de UI**: NO crear componentes base desde cero. Instalar siempre usando: `bunx shadcn@latest add [componente]`.
- **Database**: Prisma, PostgreSQL
- **Auth**: Better-Auth
- **Realtime**: Pusher
- **Tools**: Biome
- **State Management**: Zustand (Cuando llegue el momento)

## Workflow & CLI Standards (Strict)
El Agente debe usar **exclusivamente** el runtime de Bun.
1. **Instalar Dependencias:** `bun install` (Nunca `npm install`).
2. **Añadir Paquetes:** `bun add [paquete]` o `bun add -d [paquete]` para devDependencies.
3. **Ejecutar Scripts:** `bun run dev`, `bun run build`, `bun run start`.
4. **Componentes UI:** `bunx shadcn@latest add [componente]`.
5. **Base de Datos:** `bunx prisma migrate dev`, `bunx prisma generate`.

⚠️ **Prohibido:** No usar `npm`, `yarn` o `pnpm` para evitar conflictos de *lockfiles*.

## Estructura de Carpetas (`/src`)

### `/app` (Next.js App Router)
Contiene las rutas, páginas y layouts de la aplicación.
- **/api**: Endpoints de backend (Auth, Webhooks, Pusher Auth).
- **/dashboard**: Rutas protegidas para el Sales Agent.
- **/ (root)**: Landing page y rutas públicas para Leads.

### `/components`
Componentes de React reutilizables.
- **/ui**: Componentes base de Shadcn.
  - ⚠️ **Importante**: Si falta un componente (ej. `dialog`), el Agente DEBE ejecutar `bunx shadcn@latest add dialog` antes de intentar codificarlo manualmente.
- **/ui/icons**: Iconos personalizados.
- **/home**: Componentes específicos de la Landing Page.
- **/feature-name**: Componentes específicos de un feature o entidad particular (ej. `user/create`, `user/update`, `user/showUserDetail.tsx`).

### `/lib`
Configuraciones de servicios externos y singletons. Aquí reside la lógica "core".
- `db.ts`: Instancia de Prisma Client.
- `pusher.ts`: Instancia de servidor de Pusher (Triggers).
- `pusher-client.ts`: Instancia de cliente de Pusher (Listeners).
- `auth.ts`: Configuración de Better-Auth para el servidor.
- `auth-client.ts`: Configuración de Better-Auth para el cliente.

### `/utils`
Funciones auxiliares puras (Helpers).
- Formateo de fechas, manejo de errores genéricos, validaciones simples.
- `handle-response.ts`: Normalización de respuestas.

### `/types`
Definiciones de tipos TypeScript globales o compartidos entre frontend y backend.

### `/prisma`
- `schema.prisma`: La fuente de la verdad para el modelo de datos.

### `proxy.ts`
- `proxy.ts`: Utilizado por Better-Auth para la protección de rutas.

### `/services`
- `services/`: Lógica de negocio pura y acceso a BD. **NUNCA** accesible por el cliente.

### `/generated`
- Tipos y clientes generados automáticamente (ej. Prisma).

### `/actions`
- `actions/`: Controladores. Exponen mutaciones y lecturas específicas al cliente.

### `/hooks`
- `hooks/`: Hooks personalizados.


## Convenciones
1. **Server vs Client**: Los archivos en `lib` que usan secretos deben separarse de los que usa el cliente.
2. **Imports**: Usar alias `@/` para imports limpios (ej: `@/components/ui/button`).