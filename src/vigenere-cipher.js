const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
  }

  encrypt(message, key) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }

    return this.process(message, key, 'encrypt');
  }

  decrypt(message, key) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }

    return this.process(message, key, 'decrypt');
  }

  process(message, key, mode) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    message = message.toUpperCase();
    key = key.toUpperCase();

    let result = '';
    let keyIndex = 0;

    for (let i = 0; i < message.length; i++) {
      const char = message[i];
      if (alphabet.includes(char)) {
        const messageIndex = alphabet.indexOf(char);
        const keyChar = key[keyIndex % key.length];
        const keyIndexInAlphabet = alphabet.indexOf(keyChar);

        let newCharIndex;
        if (mode === 'encrypt') {
          newCharIndex = (messageIndex + keyIndexInAlphabet) % alphabet.length;
        } else if (mode === 'decrypt') {
          newCharIndex =
            (messageIndex - keyIndexInAlphabet + alphabet.length) %
            alphabet.length;
        }

        result += alphabet[newCharIndex];
        keyIndex++;
      } else {
        result += char;
      }
    }

    if (!this.isDirect) {
      result = result.split('').reverse().join('');
    }

    return result;
  }
}

module.exports = {
  VigenereCipheringMachine
};

