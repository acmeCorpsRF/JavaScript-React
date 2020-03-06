let powScript = require('../js/pow');
let pow = powScript.pow;

describe('pow()', () => {
    it('4', expect(pow(2, 2)).toBe(4));
    it('125', expect(pow(5, 3)).toBe(125));
});