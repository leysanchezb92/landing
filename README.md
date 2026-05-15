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
 
## Proceso con IA
 
Todo el proyecto fue desarrollado en conversación con Claude (Anthropic). El proceso siguió estas etapas:
 
### 1. Mapa de talentos
Le compartí a la IA mi CV, historial deportivo y contexto personal. A partir de eso, generamos un mapa visual de habilidades, intereses y oportunidades — cruzando mi experiencia como atleta con mi perfil como desarrolladora.
 
### 2. Evaluación de ideas
Propuse tres ideas de negocio posibles. La IA las evaluó en cinco criterios: valor para la audiencia, facilidad de implementación, viabilidad, satisfacción personal y diferenciación. El blog/newsletter obtuvo la puntuación más alta.
 
### 3. Perfil de usuaria
Definimos juntas a "Valentina" — el perfil de usuaria ideal: ex-atleta de 28 años, en transición hacia tech, que se siente sola en el proceso y no encuentra referentes que hablen su idioma.
 
### 4. Propuesta de valor y copy
Iteramos múltiples versiones de títulos, subtítulos y llamadas a la acción hasta llegar a un tono que fuera cercano, profesional e inspirador al mismo tiempo. El titular final: *"No empiezas desde cero. Empiezas desde el deporte."*
 
### 5. Prototipo funcional
Construimos el sitio completo: landing page, formulario de registro con lógica condicional, flujo de usuario y páginas interiores — todo en HTML, CSS y JavaScript.
 
---
 
## Estructura del proyecto
 
```
deatleta.dev/
│
├── index.html              → Redirige a landing.html (página raíz)
├── landing.html            → Página principal
├── para-quien.html         → Perfil de la audiencia objetivo
├── como-funciona.html      → Proceso y pasos del servicio
├── contenido.html          → Pilares de contenido y muestra de artículos
├── formulario-registro.html → Formulario de 5 preguntas con lógica condicional
├── flujo-usuario.html      → Mapa del journey completo de la usuaria
│
├── styles.css              → Estilos compartidos de todas las páginas
└── scripts.js              → JavaScript (FAQ interactivo)
```
 
### Decisiones técnicas
 
- **Sin frameworks**: todo el proyecto es HTML, CSS y JS puro — sin React, sin Vue, sin dependencias. Esto lo hace fácil de desplegar en cualquier plataforma estática.
- **CSS con variables**: se usó un sistema de design tokens (`--green`, `--navy`, `--orange`, etc.) para mantener consistencia visual en todas las páginas.
- **Formulario inteligente**: el formulario de registro detecta si la usuaria quiere una sesión directa y muestra un bloque de horarios de forma condicional.
- **Responsive**: todas las páginas se adaptan a móvil con un breakpoint en 700px.
---
 
## Lo que aprendí
 
Este proyecto demostró algo que el curso plantea desde el principio: la IA no reemplaza tu criterio — lo amplifica.
 
Cada decisión del proyecto (el tono del copy, el perfil de usuaria, la estructura del formulario) fue una conversación. La IA propuso, yo evalué, ajusté, rechacé o aprobé. El resultado final es más preciso porque tuve un interlocutor que podía procesar mi contexto y devolvérmelo organizado.
 
Lo más valioso no fue el código — fue el proceso de usar IA para convertir experiencia personal en propuesta de valor clara.
 
---
 
## Despliegue
 
El sitio está construido con archivos estáticos y puede desplegarse en cualquier plataforma que sirva HTML:

- **GitHub Pages**: sube los archivos a un repositorio y activa Pages en Settings
---
 
## Autora
 
**Leidy Sanchez** — Desarrolladora frontend · Ex-futbolista profesional  
Proyecto desarrollado como parte del curso Fundamentos de Inteligencia Artificial · 2026
