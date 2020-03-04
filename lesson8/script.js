// 1) необходимо реалзовать HTML форму регистрации со следующими полями
//
// name	(Допустимы символы латиницы,кириллицы, цифры и _ от 5 до 10 символов)
// email	(должен иметь вид example@domen.ru )
// password1 (минимум 10 символов, обязательна одна цифра и одна буква капсом)
// password2 (проверка совпадения с password1)
//
// при верном указании значений логин почта и пароль должны сохраняться в localstorage
// в виде массива объектов (каждый объект это данные одного пользователя).
//
// 2) добавить стили при неверном вводе:
//     - красная рамка и белый крестик в красном кругу справа при неверном вводе
// - зеленая рамка и белая галочка в зеленом кругу справа при верном вводе
//
// 3) добавить анимацию. неверное поле при попытка submit должно анимированно отреагировать
// (вибрация, пульсация, на усмотрение ученика)
//
// 4*) username не должны быть частью другого username.
//     пример:
//
// user и superuser не допустимо (user является частью superuser)

let patternName = /(^[А-ЯЁа-яёA-Za-z0-9_]{5,10}$)/i,
    patternEmail = /^\w+@[A-Za-z]+\.[A-Za-z]+$/,
    patternPassword = /^((?=.*\d)(?=.*[A-Z])).{10,}$/,
    patternConfirm = '',
    arrayUsers = [];

if (localStorage.Users == null) {
    localStorage.setItem('Users', '[]');
}

function regExpForm(_this) {
    let value = _this.value;
    let pattern;
    if (_this.getAttribute('name') == 'name') {
        pattern = patternName;
    } else if (_this.getAttribute('name') == 'email') {
        pattern = patternEmail;
    } else if (_this.getAttribute('name') == 'password') {
        pattern = patternPassword;
    }

    if (pattern.test(value)) {
        paintingGreen(_this);
    } else {
        paintingRed(_this);
    }
}

function passwordCheck(_this) {
    let verifiablePass = _this.value;
    patternConfirm = document.querySelector('[name="password"]').value;
    if (verifiablePass.length) {
        for (let i = 0; i < patternConfirm.length; i++) {
            for (let j = 0; j < verifiablePass.length; j++) {
                if (i == j) {
                    paintingGreen(_this);
                } else {
                    paintingRed(_this);
                }
            }
        }
    } else {
        paintingRed(_this);
    }
}

function paintingRed(field) {
    field.classList.add('not-valid');
    field.classList.remove('valid');
}

function paintingGreen(field) {
    field.classList.add('valid');
    field.classList.remove('not-valid');
}

function createPushObj(nameValue, emailValue, passwordValue) {
    alert('User добавлен!');
    let objUser = {};
    objUser['name'] = nameValue;
    objUser['email'] = emailValue;
    objUser['password'] = passwordValue;
    arrayUsers = JSON.parse(localStorage.Users);
    arrayUsers.push(objUser);
    localStorage.setItem('Users', JSON.stringify(arrayUsers));
}

function addUser(e) {
    e.preventDefault();
    let nameValue = document.querySelector('[name="name"]').value,
        emailValue = document.querySelector('[name="email"]').value,
        passwordValue = document.querySelector('[name="password"]').value,
        confirmValue = document.querySelector('[name="confirm"]').value;
    if ((patternName.test(nameValue)) &&
        (patternEmail.test(emailValue)) &&
        (patternPassword.test(passwordValue)) &&
        (confirmValue == passwordValue)) {
        if (JSON.parse(localStorage.Users).length == 0) {
            createPushObj(nameValue, emailValue, passwordValue);
        } else {
            let str = JSON.stringify(JSON.parse(localStorage.Users));
            console.log(str.includes(nameValue));
            if (str.includes(nameValue)) {
                alert('Недопустимое значение имени!');
            } else {
                createPushObj(nameValue, emailValue, passwordValue);
            }
        }
    } else {
        let notValid = document.getElementsByClassName('not-valid');
        for (let item of notValid) {
            item.classList.add('shaking');
            setTimeout(() => {
                item.classList.remove('shaking');
            }, 500);
        }
    }
}