function inputErrorTemplate(msg) {
  return `
    <div class="invalid-feedback">
      ${msg}
    </div>
  `
}

export function showInputError(element) {
  const parent = element.parentElement;
  const msg = element.dataset.invalidMessage || 'Invalid Input';
  const template = inputErrorTemplate(msg);
  element.classList.add('is-invalid')
  parent.insertAdjacentHTML('beforeend', template)
}

/**
 * 
 * @param {HTMLInputElement} el 
 */

export function removeInputError(el) {
  const parent = el.parentElement;
  const err = parent.querySelector('.invalid-feedback');
  if (!err) return;

  el.classList.remove('is-invalid');
  parent.removeChild(err)
}