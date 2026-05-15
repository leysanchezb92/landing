/**
 * Formulario de registro (formulario-registro.html)
 * =================================================
 * - Actualiza los dots de progreso a medida que el usuario llena el formulario
 * - Muestra el bloque de horarios cuando el usuario selecciona "sesión 1:1"
 * - Maneja la selección de chips de horario
 * - Muestra la pantalla de confirmación al enviar
 *
 * Reemplaza los antiguos `onclick`/`onchange`/`onsubmit` inline por listeners.
 */
(function () {
  'use strict';

  // Helpers para obtener elementos del DOM por id.
  function byId(id) { return document.getElementById(id); }

  // ── Progreso ────────────────────────────────────────────
  function updateDots() {
    var nombre  = (byId('f-nombre')  || {}).value;
    var email   = (byId('f-email')   || {}).value;
    var deporte = (byId('f-deporte') || {}).value;
    var ctx     = (byId('f-contexto')|| {}).value;

    var nivel = document.querySelector('[name=f-nivel]:checked');
    var nec   = document.querySelector('[name=f-necesidad]:checked');

    var filled = [
      nombre && email && nombre.trim() && email.trim(),
      deporte && deporte.trim(),
      nivel,
      nec,
      ctx && ctx.trim()
    ].filter(Boolean).length;

    for (var i = 1; i <= 5; i++) {
      var dot = byId('d' + i);
      if (!dot) return;
      dot.className = 'prog-dot';
      if (i <= filled) dot.classList.add('done');
      if (i === Math.min(filled + 1, 5)) dot.classList.add('active');
    }

    var lbl = byId('progLabel');
    if (lbl) {
      lbl.textContent = filled >= 5
        ? 'Todo listo ✓'
        : 'Pregunta ' + (filled + 1) + ' de 5';
    }
  }

  // ── Bloque condicional de horarios ──────────────────────
  function toggleScheduler(show) {
    var block = byId('f-schedulerBlock');
    if (block) block.classList.toggle('visible', !!show);
    updateDots();
  }

  // ── Chips de horario ────────────────────────────────────
  function selectChip(chip) {
    document.querySelectorAll('.chip').forEach(function (c) {
      c.classList.remove('selected');
      c.setAttribute('aria-pressed', 'false');
    });
    chip.classList.add('selected');
    chip.setAttribute('aria-pressed', 'true');
  }

  // ── Envío del formulario ────────────────────────────────
  function handleFormSubmit(event) {
    event.preventDefault();

    var nombreInput = byId('f-nombre');
    var nombre = nombreInput ? nombreInput.value.trim() : '';
    var wantSession = document.querySelector('[name=f-necesidad][value=sesion]');
    var wantSessionChecked = wantSession && wantSession.checked;

    var form = byId('mainForm');
    var conf = byId('f-confirmation');
    var row  = byId('progressRow');

    if (form) form.style.display = 'none';
    if (row)  row.style.display  = 'none';

    var nameSpan = byId('f-confName');
    if (nameSpan) nameSpan.textContent = nombre || 'atleta';

    var nsSession = byId('f-nsSession');
    if (nsSession) nsSession.classList.toggle('hidden', !wantSessionChecked);

    if (conf) {
      conf.style.display = 'block';
      // Llevar el foco a la confirmación para lectores de pantalla.
      conf.setAttribute('tabindex', '-1');
      conf.focus({ preventScroll: false });
    }
  }

  // ── Inicialización ──────────────────────────────────────
  function init() {
    var form = byId('mainForm');
    if (!form) return;

    // Submit
    form.addEventListener('submit', handleFormSubmit);

    // Inputs de texto y textarea
    form.querySelectorAll('.q-input, .q-textarea').forEach(function (el) {
      el.addEventListener('input', updateDots);
    });

    // Radios genéricos
    form.querySelectorAll('input[type=radio]').forEach(function (el) {
      el.addEventListener('change', updateDots);
    });

    // Radios de la pregunta 4 (mostrar/ocultar bloque de horarios)
    form.querySelectorAll('[name=f-necesidad]').forEach(function (radio) {
      radio.addEventListener('change', function () {
        toggleScheduler(radio.value === 'sesion');
      });
    });

    // Chips de horario
    document.querySelectorAll('.time-chips .chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        selectChip(chip);
      });
    });

    updateDots();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
