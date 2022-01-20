import { VALIDATE_PHONE_PATTERN, VALIDATE_PASSWORD_PATTERN } from '../constants/pattern';

const isSamePassword = (password: string, comparePassword: string) => {
  return comparePassword === password;
};

const validatePhone = (phone: string) => {
  var pattern = new RegExp(VALIDATE_PHONE_PATTERN);
  return pattern.test(phone);
};

const validateTextLength = (value: string, maxLength: number, minLength?: number) => {
  if (!minLength) return value.length <= maxLength;
  return value.length >= minLength && value.length <= maxLength;
};

const validatePassword = (password: string) => {
  const pattern = new RegExp(VALIDATE_PASSWORD_PATTERN);
  return pattern.test(password);
};

export { isSamePassword, validatePhone, validateTextLength, validatePassword };
