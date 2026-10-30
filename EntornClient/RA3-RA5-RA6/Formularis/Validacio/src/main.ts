const passwordInput = document.querySelector('#password') as HTMLInputElement;
const emailInput = document.querySelector('#email') as HTMLInputElement;

const requirements = {
  length: document.querySelector('#length > span') as HTMLSpanElement,
  number: document.querySelector('#number > span') as HTMLSpanElement,
  special: document.querySelector('#special > span') as HTMLSpanElement,
  case: document.querySelector('#case > span') as HTMLSpanElement,
};

const specialChars = ['!', '?', '¿', '@', '¡', '#', '$', '&'];

function setRequirementState(element: HTMLSpanElement, isValid: boolean): void {
  element.classList.remove('valid', 'invalid');

  if (isValid) {
    element.classList.add('valid');
  } else {
    element.classList.add('invalid');
  }
  element.textContent = isValid ? '\u2713' : 'x';
}

function setInputState(element: HTMLInputElement, isValid: boolean): void {
  element.classList.remove('valid', 'invalid');

  if (isValid) {
    element.classList.add('valid');
  } else {
    element.classList.add('invalid');
  }
}

function hasNumber(password: string): boolean {
  for (let i = 0; i < password.length; i++) {
    if (!isNaN(Number(password[i]))) {
      return true;
    }
  }
  return false;
}

function hasSpecialChar(password: string): boolean {
  for (let i = 0; i < password.length; i++) {
    if (specialChars.includes(password[i])) {
      return true;
    }
  }
  return false;
}

function hasUpperCase(password: string): boolean {
  for (let i = 0; i < password.length; i++) {
    if (password[i] >= 'A' && password[i] <= 'Z') {
      return true;
    }
  }
  return false;
}

function hasLowerCase(password: string): boolean {
  for (let i = 0; i < password.length; i++) {
    if (password[i] >= 'a' && password[i] <= 'z') {
      return true;
    }
  }
  return false;
}

function validatePassword(): void {
  const password = passwordInput.value.trim();

  setRequirementState(requirements.length, password.length >= 8);
  setRequirementState(requirements.number, hasNumber(password));
  setRequirementState(requirements.special, hasSpecialChar(password));
  setRequirementState(requirements.case, hasUpperCase(password) && hasLowerCase(password));
}

function validateEmail(): void {
  const email = emailInput.value.trim();
  const isValid = !!email && email.includes('@') && email.includes('.') && !email.includes(' ');

  setInputState(emailInput, isValid);
}

passwordInput.addEventListener('input', validatePassword);
emailInput.addEventListener('input', validateEmail);
