const UPPER = 'A-ZА-ЩЬЮЯҐЄІЇ';
const LOWER = 'a-zа-щьюяґєіїʼ\'';

export const validationRules = {
    firstName: [
        { test: (v) => v.length > 0, message: "Поле обов'язкове для заповнення" },
        {
            test: (v) => new RegExp(`^[${UPPER}${LOWER}]+$`).test(v),
            message: 'Допускаються лише українські чи англійські літери'
        },
        {
            test: (v) => new RegExp(`^[${UPPER}]`).test(v),
            message: 'Ім\'я має починатися з великої літери'
        }
    ],
    lastName: [
        { test: (v) => v.length > 0, message: "Поле обов'язкове для заповнення" },
        {
            test: (v) => new RegExp(`^[${UPPER}${LOWER}]+$`).test(v),
            message: 'Допускаються лише українські чи англійські літери'
        },
        {
            test: (v) => new RegExp(`^[${UPPER}]`).test(v),
            message: 'Прізвище має починатися з великої літери'
        }
    ],
    email: [
        { test: (v) => v.length > 0, message: "Поле обов'язкове для заповнення" },
        {
            test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v),
            message: 'Невірний формат e-mail (наприклад, example@example.com)'
        }
    ],
    password: [
        { test: (v) => v.length > 0, message: "Поле обов'язкове для заповнення" },
        { test: (v) => v.length >= 8, message: 'Пароль має містити мінімум 8 символів' },
        {
            test: (v) => new RegExp(`[${UPPER}]`).test(v),
            message: 'Пароль має містити хоча б одну велику літеру'
        },
        {
            test: (v) => new RegExp(`[${LOWER}]`).test(v),
            message: 'Пароль має містити хоча б одну маленьку літеру'
        },
        { test: (v) => /\d/.test(v), message: 'Пароль має містити хоча б одну цифру' },
        {
            test: (v) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(v),
            message: 'Пароль має містити хоча б один спеціальний символ (наприклад, !@#$%^&*)'
        }
    ]
};

export class FormValidator {
    constructor(form, rules, submitButton) {
        this.form = form;
        this.rules = rules;
        this.submitButton = submitButton;
        this.fields = Object.keys(rules);
    }

    init() {
        this.fields.forEach((name) => {
            const input = this.form.elements[name];
            input.addEventListener('input', () => {
                this.validateField(name);
                this.updateSubmitState();
            });
        });
        this.updateSubmitState();
    }

    getError(name) {
        const value = this.form.elements[name].value.trim();
        const failed = this.rules[name].find((rule) => !rule.test(value));
        return failed ? failed.message : '';
    }

    validateField(name) {
        const input = this.form.elements[name];
        const errorBox = this.form.querySelector(`[data-error-for="${name}"]`);
        const error = this.getError(name);

        input.classList.toggle('valid', !error);
        input.classList.toggle('invalid', !!error);
        input.setAttribute('aria-invalid', String(!!error));
        errorBox.textContent = error;

        return !error;
    }

    validateAll() {
        return this.fields.map((name) => this.validateField(name)).every(Boolean);
    }

    isFormValid() {
        return this.fields.every((name) => !this.getError(name));
    }

    updateSubmitState() {
        this.submitButton.disabled = !this.isFormValid();
    }

    getData() {
        const data = {};
        this.fields.forEach((name) => {
            data[name] = this.form.elements[name].value.trim();
        });
        return data;
    }
}