// Написать приложение-калькулятор, используя подход BDD.
// Приложение должно состоять из четырех методов для сложения,
// вычитания, умножения и деления. Каждый метод принимает на вход два аргумента и
// выполняет действие. При написании тестов учесть случаи, когда на вход подаются не числа,
// а строки, null или undefined.

function addition(a, b) {
    if (isNaN(parseInt(a)) || isNaN(parseInt(b))) {
        return null;
    } else {
        return parseInt(a) + parseInt(b);
    }
}

function subtraction(a, b) {
    if (isNaN(parseInt(a)) || isNaN(parseInt(b))) {
        return null;
    } else {
        return a - b;
    }
}

function multiplication(a, b) {
    if (isNaN(parseInt(a)) || isNaN(parseInt(b))) {
        return null;
    } else {
        return a * b;
    }
}

function division(a, b) {
    if (parseInt(b) == 0 || isNaN(parseInt(a)) || isNaN(parseInt(b))) {
        return null;
    } else {
        return a / b;
    }
}

module.exports = {addition, subtraction, multiplication, division};