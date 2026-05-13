/* ── FAQ toggle (como-funciona.html) ── */
function toggle(el) {
  el.parentElement.classList.toggle('open');
}
 
/* ── Formulario de registro ── */
function updateDots() {
  const nombre  = document.getElementById('f-nombre')?.value.trim();
  const email   = document.getElementById('f-email')?.value.trim();
  const deporte = document.getElementById('f-deporte')?.value.trim();
  const nivel   = document.querySelector('[name=f-nivel]:checked');
  const nec     = document.querySelector('[name=f-necesidad]:checked');
  const ctx     = document.getElementById('f-contexto')?.value.trim();
 
  const filled = [
    nombre && email,
    deporte,
    nivel,
    nec,
    ctx
  ].filter(Boolean).length;
 
  for (let i = 1; i <= 5; i++) {
    const dot = document.getElementById('d' + i);
    if (!dot) return;
    dot.className = 'prog-dot';
    if (i <= filled) dot.classList.add('done');
    if (i === Math.min(filled + 1, 5)) dot.classList.add('active');
  }
  const lbl = document.getElementById('progLabel');
  if (lbl) lbl.textContent = filled >= 5 ? 'Todo listo ✓' : `Pregunta ${filled + 1} de 5`;
}
 
function toggleScheduler(show) {
  const block = document.getElementById('f-schedulerBlock');
  if (block) block.classList.toggle('visible', show);
  updateDots();
}
 
function selectChip(el) {
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
}
 
function handleFormSubmit(e) {
  e.preventDefault();
  const nombre = document.getElementById('f-nombre')?.value.trim();
  const wantSession = document.querySelector('[name=f-necesidad][value=sesion]')?.checked;
  const form = document.getElementById('mainForm');
  const conf = document.getElementById('f-confirmation');
  const row  = document.getElementById('progressRow');
 
  if (form) form.style.display = 'none';
  if (row)  row.style.display  = 'none';
 
  const nameSpan = document.getElementById('f-confName');
  if (nameSpan) nameSpan.textContent = nombre || 'atleta';
 
  const nsSession = document.getElementById('f-nsSession');
  if (nsSession) nsSession.style.display = wantSession ? 'flex' : 'none';
 
  if (conf) conf.style.display = 'block';
}
 
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#mainForm .q-input, #mainForm .q-textarea').forEach(el => {
    el.addEventListener('input', updateDots);
  });
  document.querySelectorAll('#mainForm input[type=radio]').forEach(el => {
    el.addEventListener('change', updateDots);
  });
  updateDots();
});