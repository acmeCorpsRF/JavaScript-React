let mathAction = require('../js/math-action');

describe('mathAction', () => {
    it("mathAction.addition() должна вернуть сумму аргументов", () => {
        expect(mathAction.addition(1, 1)).toBe(2);
    });
    it("mathAction.addition() один из аргументов равен null", () => {
        expect(mathAction.addition(null, 1)).toBe(null);
    });
    it("mathAction.addition() один из аргументов равен undefined", () => {
        expect(mathAction.addition(undefined, 5)).toBe(null);
    });
    it("mathAction.addition() один из аргументов равен пустой строке", () => {
        expect(mathAction.addition('', 1)).toBe(null);
    });
    it("mathAction.addition() один из аргументов равен строке", () => {
        expect(mathAction.addition('123', 1)).toBe(124);
    });
});
describe('mathAction', () => {
    it("mathAction.subtraction() должна вернуть разницу аргументов", () => {
        expect(mathAction.subtraction(2, 2)).toBe(0);
    });
    it("mathAction.subtraction() один из аргументов равен null", () => {
        expect(mathAction.subtraction(null, 1)).toBe(null);
    });
    it("mathAction.subtraction() один из аргументов равен undefined", () => {
        expect(mathAction.subtraction(undefined, 5)).toBe(null);
    });
    it("mathAction.subtraction() один из аргументов равен пустой строке", () => {
        expect(mathAction.subtraction('', 1)).toBe(null);
    });
    it("mathAction.subtraction() один из аргументов равен строке", () => {
        expect(mathAction.subtraction('123', 1)).toBe(122);
    });
});
describe('mathAction', () => {
    it("mathAction.multiplication() должна вернуть разницу аргументов", () => {
        expect(mathAction.multiplication(3, 3)).toBe(9);
    });
    it("mathAction.multiplication() один из аргументов равен null", () => {
        expect(mathAction.multiplication(null, 1)).toBe(null);
    });
    it("mathAction.multiplication() один из аргументов равен undefined", () => {
        expect(mathAction.multiplication(undefined, 5)).toBe(null);
    });
    it("mathAction.multiplication() один из аргументов равен пустой строке", () => {
        expect(mathAction.multiplication('', 1)).toBe(null);
    });
    it("mathAction.multiplication() один из аргументов равен строке", () => {
        expect(mathAction.multiplication('25', 2)).toBe(50);
    });
});
describe('mathAction', () => {
    it("mathAction.division() должна вернуть разницу аргументов", () => {
        expect(mathAction.division(9, 3)).toBe(3);
    });
    it("mathAction.division() один из аргументов равен null", () => {
        expect(mathAction.division(null, 1)).toBe(null);
    });
    it("mathAction.division() один из аргументов равен undefined", () => {
        expect(mathAction.division(undefined, 5)).toBe(null);
    });
    it("mathAction.division() один из аргументов равен пустой строке", () => {
        expect(mathAction.division('', 1)).toBe(null);
    });
    it("mathAction.division() один из аргументов равен строке", () => {
        expect(mathAction.division('80', 2)).toBe(40);
    });
    it("mathAction.division() делитель не может быть равен 0", () => {
        expect(mathAction.division(10, 0)).toBe(null);
    });
});