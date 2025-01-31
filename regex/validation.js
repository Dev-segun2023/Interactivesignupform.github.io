

AOS.init({
 
});

const inputs = document.querySelectorAll('input');
const form = document.querySelector('form');

const patterns = {
  telephone: /^\d{11}$/,
  username: /^[a-z\d]{5,12}$/i,
  password: /^([\w@]){8,20}$/,
  email: /^([a-z\d_]+)@([a-z]{2,20})\.([a-z]{2,8})(\.[a-z]{2,8})?$/
};

function validate(field, regex) {
  if (regex.test(field.value)) {
    field.className = 'valid';
  } else {
    field.className = 'invalid';
  }
}

// Enable confirm password field when password field is filled
const passwordField = document.querySelector('.password');
const confirmPasswordField = document.querySelector('.confirmPassword');

passwordField.addEventListener('input', () => {
  if (passwordField.value.trim() !== '') {
    confirmPasswordField.disabled = false;
  } else {
    confirmPasswordField.disabled = true;
    confirmPasswordField.value = '';
    confirmPasswordField.classList.remove('valid', 'invalid');
  }
});

// Validate all fields on form submission
form.addEventListener('submit', (e) => {
  let isValid = true;

  inputs.forEach((input) => {
    if (input.name !== 'confirmPassword') {
      validate(input, patterns[input.name]);
      if (input.classList.contains('invalid')) {
        isValid = false;
      }
    }
  });

  const password = passwordField.value;
  const confirmPassword = confirmPasswordField.value;
  const message = document.querySelector('.message');

  if (password !== null || password !== confirmPassword) {
    isValid = false;
    message.innerHTML = 'Passwords do not match';
    message.style.color = 'orangered';
    passwordField.classList.add('invalid');
    confirmPasswordField.classList.add('invalid');
  } else {
    message.innerHTML = '';
    passwordField.classList.remove('invalid');
    confirmPasswordField.classList.remove('invalid');
  }

  if (!isValid) {
    e.preventDefault(); // Prevent form submission if validation fails
  }
});

// Validate fields on keyup
inputs.forEach((input) => {
  input.addEventListener('keyup', (e) => {
    if (e.target.name !== 'confirmPassword') {
      validate(e.target, patterns[e.target.name]);
    }
  });
});