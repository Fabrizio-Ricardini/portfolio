# Portfolio Personal (Dual Terminal/Modern UI)

> [!NOTE]
> **Live Demo:** [Insertar Link de Deploy Aquí]

![Preview del Proyecto](https://via.placeholder.com/800x400?text=Preview+Terminal+vs+Modern+UI)
*Una experiencia inmersiva que transiciona entre una terminal de desarrollador y una landing page moderna.*

---

## 🚀 Concepto

Este proyecto no es solo un portfolio, es una demostración de ingeniería de frontend. Combina la nostalgia de las interfaces de línea de comandos (CLI) con la usabilidad del diseño web moderno.

**El problema que resuelve:** Los portfolios de desarrolladores suelen ser aburridos o difíciles de navegar. Este diseño híbrido captura la atención técnica (Modo Terminal) mientras ofrece una experiencia accesible para reclutadores no técnicos (Modo Moderno).

## ✨ Características Principales

*   **Dual UI System:** Transiciones fluidas entre modos usando `Framer Motion` (layout projection).
*   **Simulación de Terminal Real:**
    *   Sistema de archivos recursivo navegable.
    *   Comandos funcionales simulados (`ls`, `cat`, scripts de contacto).
    *   Efectos CRT, scanlines y "apagado de monitor" retro.
*   **Modo Moderno (Recruiter Friendly):**
    *   Diseño Glassmorphism limpio y accesible.
    *   Tipografía optimizada (Inter vs JetBrains Mono).
*   **Persistencia de Estado:** El contexto global mantiene tu "ubicación" en el sistema de archivos al cambiar de modo.

## 🛠️ Stack Tecnológico & Decisiones

*   **Core:** [Next.js 16](https://nextjs.org/) (App Router)
    *   *Por qué:* Para aprovechar Server Components en la carga inicial y el enrutado robusto.
*   **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/)
    *   *Por qué:* Uso de las nuevas variables CSS nativas para temas dinámicos y menor tamaño de bundle.
*   **Animaciones:** [Framer Motion](https://www.framer.com/motion/)
    *   *Por qué:* Indispensable para las animaciones `layoutId` que transforman físicamente la ventana de terminal en tarjetas modernas sin saltos de corte.
*   **Iconos:** Lucide React
    *   *Por qué:* Consistencia visual ligera y adaptable a ambos estilos.

## 📂 Arquitectura

El proyecto evita la complejidad de una base de datos para mantener la velocidad, usando una "Base de Datos Estática" en `lib/data.ts`:

*   **Virtual FileSystem:** Un árbol recursivo de objetos que define carpetas y archivos.
*   **Renderers Dinámicos:** Componentes que saben cómo dibujar un archivo `.md`, `.sh` o una carpeta, desacoplando los datos de la vista.

## 🧠 Retos y Aprendizajes

*   **Layout Projection:** Lograr que la ventana de la terminal se "transforme" en el contenedor moderno requirió un uso avanzado de `AnimatePresence` y claves de layout compartidas.
*   **Efectos CRT:** Implementar scanlines y distorsión RGB puramente con CSS y SVG filters sin impactar el rendimiento del scroll.

## 🚀 Roadmap

- [ ] Agregar soporte para comandos reales (`mkdir`, `touch`) en el navegador.
- [ ] Integrar un "huevo de pascua" con un minijuego en la terminal.
- [ ] Modo "Matrix" como tema alternativo.

## 💻 Desarrollo Local

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Ver en http://localhost:3000
```
