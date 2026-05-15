/**
 * FAQ acordeón
 * ============
 * Cada .faq-item tiene un botón .faq-q (con aria-expanded) y un panel .faq-a.
 * Al hacer clic en el botón, alterna la clase .open en el item y actualiza aria-expanded.
 *
 * Reemplaza los antiguos `onclick="toggle(this)"` inline por listeners.
 */
(function () {
  'use strict';

  function toggleFaqItem(button) {
    var item = button.parentElement;
    if (!item) return;
    var isOpen = item.classList.toggle('open');
    button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  function init() {
    var buttons = document.querySelectorAll('.faq-q');
    if (!buttons.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        toggleFaqItem(btn);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
