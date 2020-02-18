// 1) Написать программу, которая получает слово (через prompt)
// и выводит его в консоль с большой буквы (первая буква должна быть большой,
// все остальные, маленькие).

function wordCapitalize() {
    let word = prompt("Введите слово");
    console.log(word[0].toUpperCase() + word.slice(1).toLowerCase());
}

wordCapitalize();

// 2) Написать программу, которая получает возраст пользователя
// и в зависимости от значения приветствует его
//
// 0-6 - “привет малыш“
// 7-14 - “привет школьник”
// 15-17 - “добрый день, молодой человек”
// 18-44 - “здравствуйте”
// 44-130 - “мое почтение”

function helloUser() {
    let age = prompt("Сколько юзеру лет?");
    if (age >= 0 && age <= 6) {
        alert('привет малыш');
    } else if (age >= 7 && age <= 14) {
        alert('привет школьник');
    } else if (age >= 15 && age <= 17) {
        alert('добрый день, молодой человек');
    } else if (age >= 18 && age <= 44) {
        alert('здравствуйте');
    } else if (age >= 44 && age <= 130) {
        alert('мое почтение');
    }
}

helloUser();

// 3)* Добавьте к заданию 2 валидацию введенного значения.
//     Программа работает только на диапазоне возрастов от 0 до 130 и только с числами.
//     При неверно введенном возрасте программа должна оповестить пользователя об ошибке
//     и прекратить выполнение.

function helloUserValidation() {
    let age = prompt("Сколько юзеру лет?");
    age = +age;
    if ((!isNaN(age)) && (age >= 0 && age <= 130)) {
        if (age >= 0 && age <= 6) {
            alert('привет малыш');
        } else if (age >= 7 && age <= 14) {
            alert('привет школьник');
        } else if (age >= 15 && age <= 17) {
            alert('добрый день, молодой человек');
        } else if (age >= 18 && age <= 44) {
            alert('здравствуйте');
        } else if (age >= 44 && age <= 130) {
            alert('мое почтение');
        }
    } else {
        console.error("Неверно введен возраст!");
        alert("Неверно введен возраст!")
    }

}

helloUserValidation();

// 4)* Написать калькулятор. Программа получает два значения и знак (через prompt).
// Все значения вводятся отдельно. В зависимости от введенного знака производится
// соответствующее математическое действие, а результат выводится в консоль. Учтите деление на 0.

function calculator() {
    let operand1 = prompt("Введите 1-ое значение...");
    let operand2 = prompt("Введите 2-ое значение...");
    let operator = prompt("Введите знак математического действия...");
    operand1 = +operand1;
    operand2 = +operand2;
    if (isNaN(operand1) || isNaN(operand2)) {
        alert("Неверно введено значение!");
    } else {
        switch (operator) {
            case '+' :
                console.log(operand1 + operand2);
                break;
            case '-' :
                console.log(operand1 - operand2);
                break;
            case '*' :
                console.log(operand1 * operand2);
                break;
            case '/' :
                (operand2 == 0) ? alert("На 0 делить нельзя!") : console.log(operand1 / operand2);
                break;
            case '**' :
                console.log(operand1 ** operand2);
                break;
            default :
                alert("Неверно введен знак!");
        }
    }
}

calculator();