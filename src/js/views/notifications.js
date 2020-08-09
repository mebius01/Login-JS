function getContainer() {
  return document.querySelector('.notify-container');
}

function notifyContanerTemplate() {
  return `
    <div class="notify-container" style="position: fixed; top: 10px; right: 10px; z-index: 99;"></div>
  `;
}

function createNotifyContaner() {
  const template = notifyContanerTemplate();
  document.body.insertAdjacentHTML('afterbegin', template)
}

function alertTemplate(msg, className, index) {
  return `
    <div class="alert ${className}" data-index="${index}">
      ${msg}
    </div>
  `;
}

function getAlertIndex() {
  return document.querySelectorAll('.notify-container .alert').length;
}

/**
 * 
 * @param {Object} setting 
 * @param {String} setting.msg 
 * @param {String} setting.className
 * @param {number} setting.timeout 
 */
export function notify({
  msg = 'Info MSG',
  className = 'alert-info',
  timeout = 2000
} = {}) {
  if (!getContainer()) {
    createNotifyContaner();
  }
  const index = getAlertIndex()
  const template = alertTemplate(msg, className, index);
  const container = getContainer();

  container.insertAdjacentHTML('beforeend', template);

  setTimeout(() => closeNotify(index), timeout)
}

export function closeNotify(index) {
  let alert;

  if (index === undefined) {
    alert = document.querySelector('.notify-container .alert');
  } else {
    alert = document.querySelector(`.notify-container .alert[data-index="${index}"]`);
  }

  if (!alert) {
    console.warn('Alert not fount');
    return;
  }

  const container = getContainer();
  container.removeChild(alert);
}