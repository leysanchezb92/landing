/**
 * Registration form behavior (formulario-registro.html).
 *
 * Responsibilities:
 *   - Update the progress dots as fields are filled.
 *   - Toggle the conditional scheduler block when "sesion" is chosen.
 *   - Manage selection state of time chips (single-select).
 *   - Render the inline confirmation state on submit.
 *
 * No inline event handlers — everything is wired up here via
 * standard addEventListener so the HTML stays declarative.
 */

const TOTAL_QUESTIONS = 5;

function getFieldValues() {
  return {
    nombre: document.getElementById('f-nombre')?.value.trim() || '',
    email: document.getElementById('f-email')?.value.trim() || '',
    deporte: document.getElementById('f-deporte')?.value.trim() || '',
    nivel: document.querySelector('[name="f-nivel"]:checked'),
    necesidad: document.querySelector('[name="f-necesidad"]:checked'),
    contexto: document.getElementById('f-contexto')?.value.trim() || '',
  };
}

function updateDots() {
  const v = getFieldValues();
  const filled = [
    v.nombre && v.email,
    v.deporte,
    v.nivel,
    v.necesidad,
    v.contexto,
  ].filter(Boolean).length;

  for (let i = 1; i <= TOTAL_QUESTIONS; i++) {
    const dot = document.getElementById('d' + i);
    if (!dot) continue;
    dot.className = 'prog-dot';
    if (i <= filled) dot.classList.add('done');
    if (i === Math.min(filled + 1, TOTAL_QUESTIONS)) dot.classList.add('active');
  }

  const label = document.getElementById('progLabel');
  if (label) {
    label.textContent = filled >= TOTAL_QUESTIONS
      ? 'Todo listo ✓'
      : `Pregunta ${filled + 1} de ${TOTAL_QUESTIONS}`;
  }
}

function setSchedulerVisible(visible) {
  const block = document.getElementById('f-schedulerBlock');
  if (block) block.classList.toggle('visible', visible);
}

function handleNeedChange(event) {
  const value = event.target.value;
  setSchedulerVisible(value === 'sesion');
  updateDots();
}

function handleChipClick(event) {
  const clicked = event.currentTarget;
  document.querySelectorAll('.time-chips .chip').forEach((c) => {
    c.classList.remove('selected');
    c.setAttribute('aria-pressed', 'false');
  });
  clicked.classList.add('selected');
  clicked.setAttribute('aria-pressed', 'true');
}

function handleSubmit(event) {
  event.preventDefault();

  const { nombre, necesidad } = getFieldValues();
  const wantsSession = necesidad?.value === 'sesion';

  const form = document.getElementById('mainForm');
  const confirmation = document.getElementById('f-confirmation');
  const progressRow = document.getElementById('progressRow');
  const nameSpan = document.getElementById('f-confName');
  const sessionStep = document.getElementById('f-nsSession');

  if (form) form.hidden = true;
  if (progressRow) progressRow.hidden = true;
  if (nameSpan) nameSpan.textContent = nombre || 'atleta';
  if (sessionStep) sessionStep.hidden = !wantsSession;
  if (confirmation) {
    confirmation.setAttribute('data-visible', 'true');
    confirmation.focus?.();
  }
}

export function initForm(root = document) {
  const form = root.getElementById ? root.getElementById('mainForm') : document.getElementById('mainForm');
  if (!form) return;

  form.addEventListener('submit', handleSubmit);

  form.querySelectorAll('.q-input, .q-textarea').forEach((el) => {
    el.addEventListener('input', updateDots);
  });

  form.querySelectorAll('input[name="f-nivel"]').forEach((el) => {
    el.addEventListener('change', updateDots);
  });

  form.querySelectorAll('input[name="f-necesidad"]').forEach((el) => {
    el.addEventListener('change', handleNeedChange);
  });

  form.querySelectorAll('.time-chips .chip').forEach((chip) => {
    chip.addEventListener('click', handleChipClick);
  });

  updateDots();
}
