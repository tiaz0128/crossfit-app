const PASSWORD_MAX_LENGTH = 16;
const PASSWORD_MIN_LENGTH = 8;
export const CORRECT_PASSWORD_PATTERN = `^[A-Za-z\\d$@$!%*#?&]{0,${PASSWORD_MAX_LENGTH}}$`;
export const VALIDATE_PASSWORD_PATTERN = `^(?=.*[A-Za-z0-9])(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{${PASSWORD_MIN_LENGTH},${PASSWORD_MAX_LENGTH}}$`;

const EMAIL_MAX_LENGTH = 100;
export const CORRECT_EMAIL_PATTERN = `^[A-Za-z\\d@_.]{0,${EMAIL_MAX_LENGTH}}$`;

export const ABOUT_MAX_LENGTH = 300;

export const VALIDATE_PHONE_PATTERN = `^010-[0-9]{3,4}-[0-9]{4}$`;
