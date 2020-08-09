import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

import UI from '../js/config/ui.config'
import {
  validate
} from '../js/helpers/validate'

import {
  showInputError,
  removeInputError
} from '../js/views/form'

import {
  login
} from '../js/services/auth'

import {
  notify
} from './views/notifications'

const {
  form,
  inputEmail,
  inputPassword
} = UI

const inputs = [inputEmail, inputPassword]

// Events

form.addEventListener('submit', e => {
  e.preventDefault();
  onSubmit();
});
inputs.forEach(element => element.addEventListener('focus', () => removeInputError(element)));


// Handlers

async function onSubmit() {
  const isValidForm = inputs.every(el => {
    const isValidInput = validate(el);
    if (!isValidInput) {
      showInputError(el)
    }
    return isValidInput;
  });

  if (!isValidForm) return;

  try {
    await login(inputEmail.value, inputPassword.value)
    form.reset()
    notify({
      msg: 'Login success',
      className: 'alert-success',
      timeout: 1000
    })
  } catch (error) {
    notify({
      msg: 'Login error',
      className: 'alert-danger',
      timeout: 1000
    })
  }
}