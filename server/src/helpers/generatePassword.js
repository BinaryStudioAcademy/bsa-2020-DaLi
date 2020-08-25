export function generatePassword(passwordLength = 8, useUpperCase = true, useNumbers = true, useSpecialChars = true) {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const specialChars = '!£$%^&*()';

  const usableChars =
    chars +
    (useUpperCase ? chars.toUpperCase() : '') +
    (useNumbers ? numberChars : '') +
    (useSpecialChars ? specialChars : '');

  let generatedPassword = '';

  for (let i = 0; i <= passwordLength; i++) {
    generatedPassword += usableChars[Math.floor(Math.random() * usableChars.length)];
  }

  return generatedPassword;
}
