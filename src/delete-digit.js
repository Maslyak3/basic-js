const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  let result = 0;
  let arrayDigit = Array.from(String(n), Number);
  for (let i = 0; i < arrayDigit.length; i++) {
    const arrCopy = [...arrayDigit];

    let changedArrayStr = arrCopy.splice(i, 1);
    const num = Number(arrCopy.join(''));
    if (num > result) {
      result = num;
    }
  }
  return result;
}

module.exports = {
  deleteDigit
};
