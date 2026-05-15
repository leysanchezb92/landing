/**
 * Entry script — loaded by every page as <script type="module">.
 * Each feature module is responsible for its own initialization
 * guard (no-op if its markup is absent on this page).
 */
import { initFaq } from './faq.js';
import { initForm } from './form.js';

const ready = (fn) => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn, { once: true });
  } else {
    fn();
  }
};

ready(() => {
  initFaq();
  initForm();
});
