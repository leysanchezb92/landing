/**
 * FAQ accordion behavior.
 *
 * Markup contract:
 *   <div class="faq-item">
 *     <button class="faq-q" aria-expanded="false" aria-controls="faq-aN">…</button>
 *     <div class="faq-a" id="faq-aN" hidden>…</div>
 *   </div>
 *
 * Keeps aria-expanded / hidden attributes in sync for screen readers
 * and toggles a .open class on the wrapper for CSS styling.
 */
export function initFaq(root = document) {
  const buttons = root.querySelectorAll('.faq-q');
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      if (!item) return;

      const isOpen = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));

      const panelId = btn.getAttribute('aria-controls');
      if (panelId) {
        const panel = root.getElementById ? root.getElementById(panelId) : document.getElementById(panelId);
        if (panel) panel.toggleAttribute('hidden', !isOpen);
      }
    });
  });
}
