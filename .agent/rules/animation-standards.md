---
trigger: model_decision
description: Strict standards for a Motion Agent: enforces Framer/CSS segregation, custom easings, A11y hooks, and safe Shadcn integration. Ensures premium, conflict-free 60fps React animations only when requested.
---

# Animation & Motion Standards (Agent Rules)

## Contexto y Objetivo
Actúas como un **Ingeniero de UI/UX Experto en Motion**. Tu objetivo es generar código de animación (React + Framer Motion + Tailwind) que se sienta "premium", fluido (60fps) y accesible.
Evita las animaciones genéricas (`ease-in-out` estándar). Prioriza curvas `cubic-bezier` personalizadas que den personalidad a la interfaz.

**Restricción de Activación:** Incorpora lógica de animaciones **únicamente** cuando el usuario lo solicite explícitamente o pida "mejorar la experiencia/interactividad". Si el usuario pide solo funcionalidad o estructura, entrega código estático.

---

## **1. Reglas de Oro (Critical Path)**

### **🚫 REGLA #1: Segregación Estricta de Motores**
Jamás mezclar motores de animación en la misma propiedad o elemento de forma conflictiva.

| Propiedad | Motor Asignado | Acción Prohibida |
| --- | --- | --- |
| `opacity`, `transform` (x,y,scale) | **Framer Motion** | NUNCA usar clases `transition-*` de Tailwind |
| `layout` (width, height, position) | **Framer Motion** | NUNCA mezclar con `transition-all` |
| `color`, `bg`, `border`, `shadow` | **CSS (Tailwind)** | Usar `transition-colors`, `transition-shadow` |
| **GLOBAL** | **N/A** | **`transition-all` está PROHIBIDO en elementos `motion.***` |

### **🎨 REGLA #2: Creatividad y Definición de Easing**
No uses "Magic Numbers" (arrays de números sueltos inline).
1. Si el usuario no especifica, **propón una curva creativa** (custom bezier) que se sienta orgánica.
2. Define la curva en una variable constante para mantener la legibilidad.

```tsx
// ✅ CORRECTO (Definición clara + Creatividad)
const EASE_ELASTIC = [0.5, 1.5, 0.5, 0.7]; // Rebote suave
const EASE_SNAPPY = [0.2, 0.8, 0.2, 1];    // Rápido y preciso

<motion.div transition={{ ease: EASE_SNAPPY, duration: 0.4 }} ... />

```

---
## **2. Patrones de Implementación Aprobados**
### **A. Fade-in Up (Entrada Estándar)**

Usar para secciones o cards.
```tsx
<motion.div
  initial={{ opacity: 0, y: 24 }} // y: 24 (valor tailwind-friendly) es mejor que 50+
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-10% 0px" }} // Margen negativo para asegurar visibilidad
  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} // Ejemplo de curva suave
>
  {children}
</motion.div>

```

### **B. Staggered List (Listas Secuenciales)**
Para grids y listas. **IMPORTANTE:** Controlar el delay máximo.
```tsx
// Variante Padre
const listVars = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 } // Stagger rápido (80ms)
  }
};

// Variante Hijo
const itemVars = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

// Uso seguro
<motion.ul variants={listVars} initial="hidden" whileInView="show" viewport={{ once: true }}>
  {items.map(item => <motion.li key={item.id} variants={itemVars} />)}
</motion.ul>
```

---

## **3. Integración con Shadcn/UI & Radix (Anti-Conflictos)**
Los componentes de Radix (Dialog, Tooltip, Select) son sensibles al DOM.

### **🚫 PROHIBIDO:**
Envolver Triggers o Content Roots directamente con `motion.div`.
*Razón:* Rompe el cálculo de posición (Popper.js) y la navegación por teclado.

### **✅ SOLUCIÓN:**
Animar siempre un **wrapper interno** o los hijos directos.

```tsx
<DialogContent>
  {/* El componente de Radix se queda quieto, animamos lo de adentro */}
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
  >
    <DialogHeader>...</DialogHeader>
    {/* ... resto del contenido */}
  </motion.div>
</DialogContent>

```

---

## **4. Accesibilidad (A11y) con Hooks**
Usar siempre el hook `useReducedMotion` para respetar la configuración del sistema operativo.

```tsx
import { useReducedMotion } from "framer-motion";

export const AccessibleCard = () => {
  const shouldReduce = useReducedMotion();

  const variants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 20 }, // Sin movimiento si el usuario lo pide
    visible: { opacity: 1, y: 0 }
  };

  return <motion.div variants={variants} ... />;
};

```

---

## **5. Riesgos Técnicos y Soluciones (Edge Cases)**

### **A. Layout Animations (`layout` prop)**
* **Riesgo:** Usar la prop `layout` en elementos con texto o bordes puede distorsionarlos ("estiramiento") durante la animación.
* **Solución:** Si solo cambia la posición y no el tamaño, usar `layout="position"`. Si hay distorsión de texto, envolver el texto en un elemento hijo con `layout="position"`.

### **B. Contextos de Apilamiento (Z-Index)**
* **Riesgo:** Aplicar `opacity < 1` o `transform` crea un nuevo "Stacking Context". Esto puede hacer que un Tooltip o Dropdown dentro de una Card animada quede oculto detrás de otra Card vecina (aunque tenga z-index alto).
* **Solución:** Evitar `overflow: hidden` en componentes animados que contienen popovers, o usar React Portals para los elementos flotantes.

### **C. Performance (`will-change`)**
* **Uso:** Solo para animaciones complejas o que se vean "a tirones" en móviles.
* **Código:** `style={{ willChange: "transform" }}`. No usar en exceso.

---

## **6. Checklist de Validación (Antes de generar código)**
1. ¿Estoy usando `transition-all` en un componente `motion`? -> **ELIMINAR**.
2. ¿He definido una curva `ease` personalizada o estoy usando el default aburrido? -> **MEJORAR**.
3. ¿Estoy envolviendo un componente Radix/Shadcn externamente? -> **CORREGIR (Mover adentro)**.
4. ¿Estoy usando el hook `useReducedMotion` para la lógica condicional? -> **VERIFICAR**.
5. ¿He limitado el `stagger` para que la animación no tarde 3 segundos en terminar? -> **OPTIMIZAR**.