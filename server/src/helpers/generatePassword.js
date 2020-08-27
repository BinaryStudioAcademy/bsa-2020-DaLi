export const generatePassword = (passwordLength = 8) => {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  const specialChars = '!@#$%^&*()_+:<>?|;,.~';
  const numberChars = '0123456789';
  const upperCaseChars = chars.toUpperCase();

  const specialCharsReg = /[-!$%^&*()_+|~=:;<>?,#@.]/g;
  const numberCharsReg = /[0-9]+/g;
  const upperCaseReg = /[A-Z]/g;

  const getRandomIndex = (limit) => Math.floor(Math.random() * limit);

  const usableChars = chars + upperCaseChars + numberChars + specialChars;

  let generatedPassword = '';

  for (let i = 0; i < passwordLength; i++) {
    generatedPassword += usableChars[getRandomIndex(usableChars.length)];
  }

  if (!generatedPassword.match(specialCharsReg)) {
    generatedPassword += specialChars[getRandomIndex(specialChars.length)];
  }
  if (!generatedPassword.match(numberCharsReg)) {
    generatedPassword += numberChars[getRandomIndex(numberChars.length)];
  }
  if (!generatedPassword.match(upperCaseReg)) {
    generatedPassword += upperCaseChars[getRandomIndex(upperCaseChars.length)];
  }

  return generatedPassword;
};
