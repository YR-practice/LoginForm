import { writeName } from './library.js';
import { validationRules, FormValidator } from './validation.js';

const form = document.getElementById('loginForm');
const result = document.getElementById('result');
const passwordInput = document.getElementById('password');
const toggleCheckbox = document.getElementById('togglePassword');
const submitButton = document.getElementById('submitButton');
const overlay = document.getElementById('overlay');
const modalClose = document.getElementById('modalClose');
const modalButton = document.getElementById('modalButton');

const validator = new FormValidator(form, validationRules, submitButton);
validator.init();

toggleCheckbox.addEventListener('change', () => {
    passwordInput.type = toggleCheckbox.checked ? 'text' : 'password';
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Форму можна відправити лише якщо всі поля пройшли валідацію
    if (!validator.validateAll()) {
        validator.updateSubmitState();
        return;
    }

    const data = validator.getData();
    console.log('Дані форми:', data);

    writeName(data.firstName, result);
    openModal();
});

modalClose.addEventListener('click', closeModal);
modalButton.addEventListener('click', closeModal);
overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closeModal();
});

function openModal() {
    overlay.classList.add('visible');
}

function closeModal() {
    overlay.classList.remove('visible');
}