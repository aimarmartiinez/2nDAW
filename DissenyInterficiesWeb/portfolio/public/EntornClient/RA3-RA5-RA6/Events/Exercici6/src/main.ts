const button = document.getElementById('send');

if (button) {
  button.addEventListener('click', () => {
    validate();
  });
}

function validate(): void {
  const emailInput = document.getElementById('email') as HTMLInputElement | null;
  const passwordInput = document.getElementById('password') as HTMLInputElement | null;

  if (!emailInput || !passwordInput) return;

  const email = emailInput.value;
  const password = passwordInput.value;

  if (!email || !password) return;

  // Reset validations
  resetValidation();

  // Length
  if (password.length >= 8) {
    markValid('length');
  }

  // Number
  if (/\d/.test(password)) {
    markValid('number');
  }

  // Special character
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    markValid('special');
  }

  // Uppercase & lowercase
  if (/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
    markValid('case');
  }
}

function markValid(id: string): void {
  const element = document.getElementById(id);
  if (element) {
    const dot = element.querySelector('.dot');
    const span = element.getElementsByTagName('span')[0];

    if (dot) dot.textContent = '✓';
    if (span) span.classList.add('valid');
  }
}

function resetValidation(): void {
  const ids = ['length', 'number', 'special', 'case'];

  ids.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      const dot = element.querySelector('.dot');
      const span = element.getElementsByTagName('span')[0];

      if (dot) dot.textContent = '•';
      if (span) span.classList.remove('valid');
    }
  });
}
