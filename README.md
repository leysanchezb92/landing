# De Atleta a Dev — Landing page MVP

Proyecto final del curso **Fundamentos de Inteligencia Artificial**.

---

## Sobre el curso

La inteligencia artificial está transformando el mundo laboral. Este programa de 6 semanas está diseñado para que cualquier persona —sin importar su trasfondo técnico— comprenda cómo funciona la IA y la use para crear algo propio.

El proyecto del curso tiene un objetivo concreto: explorar tus talentos con herramientas de IA y construir un MVP que conecte tus habilidades con oportunidades de crecimiento profesional.

---

## El proyecto: deatleta.dev

**deatleta.dev** es el MVP de un blog/newsletter dirigido a ex-atletas de alto rendimiento que quieren entrar al mundo de la tecnología.

La propuesta central es simple: las personas que vienen del deporte competitivo no empiezan desde cero en tech — tienen disciplina, resiliencia y mentalidad de crecimiento que son ventajas reales. Este proyecto existe para nombrar eso y acompañar esa transición.

### ¿Por qué este proyecto?

El punto de partida fue mi propio perfil: soy desarrolladora frontend y ex-futbolista profesional. A través del proceso del curso, usé herramientas de IA para explorar mis talentos, identificar oportunidades y construir algo que conectara ambos mundos.

Lo que empezó como un ejercicio de autoconocimiento terminó siendo un producto real con audiencia definida, propuesta de valor clara y prototipo funcional.

---

## Estructura del proyecto

```
deatleta.dev/
│
├── index.html                 → Splash / página de bienvenida
├── landing.html               → Landing principal con propuesta de valor
├── para-quien.html            → Perfil de la audiencia objetivo + fundadora
├── como-funciona.html         → Proceso paso a paso + FAQ
├── contenido.html             → Pilares de contenido + muestra de artículos
├── formulario-registro.html   → Formulario de 5 preguntas con lógica condicional
│
├── robots.txt                 → Reglas para crawlers
├── sitemap.xml                → Sitemap para buscadores
│
└── assets/
    ├── css/
    │   ├── main.css           → Entry point (sólo @imports)
    │   ├── base/              → tokens, reset, typography, accesibilidad
    │   ├── layout/            → nav, footer, hero, section
    │   ├── components/        → cards, faq, form, timeline, etc.
    │   └── pages/             → estilos específicos de página (intro, form-page)
    ├── js/
    │   ├── main.js            → Entry (ES module) — DOMContentLoaded
    │   ├── faq.js             → Comportamiento del acordeón de FAQ
    │   └── form.js            → Lógica del formulario de registro
    └── img/
        └── valentina.svg      → Avatar local de la persona-usuaria
```

### Separación de responsabilidades

| Capa            | Qué contiene                                      |
| --------------- | ------------------------------------------------- |
| **HTML**        | Estructura semántica y contenido — sin estilos ni handlers inline |
| **CSS**         | Presentación — un archivo por componente, importado desde `main.css` |
| **JS**          | Comportamiento — módulos ES con `addEventListener`, sin `onclick=` |

### Decisiones técnicas

- **Sin frameworks**: HTML, CSS y JS puro — sin React, sin Vue, sin dependencias.
- **CSS organizado por capas**: base / layout / components / pages. Cada componente vive en su propio archivo, todo entra por `assets/css/main.css` vía `@import`.
- **JS modular**: `assets/js/main.js` es el único punto de entrada; importa `faq.js` y `form.js`. Cada módulo se inicializa solo si encuentra su markup.
- **CSS variables (tokens)**: el archivo `assets/css/base/tokens.css` es la fuente única de verdad para colores y tipografías.
- **Formulario inteligente**: detecta si la usuaria quiere una sesión directa y muestra un bloque de horarios de forma condicional.
- **Responsive**: breakpoints en 600px y 700px (ver `@media` en cada componente).

### SEO

- Cada página tiene `<title>`, `<meta description>`, `canonical` y etiquetas Open Graph / Twitter Card.
- JSON-LD en `landing`, `como-funciona`, `contenido`, `para-quien` y `formulario-registro`
  (esquemas `WebSite`, `WebPage`, `Person`, `HowTo`, `FAQPage`, `BreadcrumbList`).
- `robots.txt` + `sitemap.xml` en la raíz.
- Etiquetas geo (`geo.region`, `geo.placename`, `geo.position`, `ICBM`) para Bogotá, Colombia.

### Accesibilidad

- `lang="es"` y `meta theme-color` en todas las páginas.
- Skip link (`.skip-link`) para saltar al contenido principal.
- Landmarks: `<header>`, `<main id="contenido-principal">`, `<footer>`.
- Headings jerárquicos (un `<h1>` por página, sin saltar niveles).
- Imágenes con `alt`, decorativas con `aria-hidden="true"`.
- Foco visible (`:focus-visible`) y `prefers-reduced-motion` respetado.
- Formulario con `<label>` para cada input, `fieldset` + `legend` para grupos de radios, `aria-describedby` para ayudas, `aria-live="polite"` para la confirmación y la barra de progreso.
- FAQ implementado como `<button>` con `aria-expanded` y `aria-controls`.

---

## Despliegue

El sitio está construido con archivos estáticos y puede desplegarse en cualquier plataforma que sirva HTML:

- **Netlify**: arrastra la carpeta a [netlify.com/drop](https://netlify.com/drop)
- **GitHub Pages**: sube los archivos a un repositorio y activa Pages en Settings
- **Vercel**: conecta el repositorio y despliega automáticamente

> Importante: los `<script type="module">` necesitan que las páginas se sirvan por HTTP/HTTPS — abrir el archivo con `file://` no carga los módulos. Para desarrollo local usa cualquier servidor estático, por ejemplo `python3 -m http.server` desde la raíz del proyecto.

---

## Autora

**Leidy Sanchez** — Desarrolladora frontend · Ex-futbolista profesional
Proyecto desarrollado como parte del curso Fundamentos de Inteligencia Artificial · 2026
