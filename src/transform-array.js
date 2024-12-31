const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }

  const result = [];
  const controlSequences = [
    '--discard-next',
    '--discard-prev',
    '--double-next',
    '--double-prev'
  ];

  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];

    if (current === '--discard-next') {
      if (i + 1 < arr.length) i++;
    } else if (current === '--discard-prev') {
      if (i > 0 && arr[i - 1] !== null) result.pop();
    } else if (current === '--double-next') {
      if (i + 1 < arr.length) result.push(arr[i + 1]);
    } else if (current === '--double-prev') {
      if (i > 0 && arr[i - 1] !== null) result.push(arr[i - 1]);
    } else {
      result.push(current);
    }
  }

  return result;
}

module.exports = {
  transform
};

