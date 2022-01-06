const PASSWORD_MAX_LENGTH = 16;
export const CORRECT_PASSWORD_PATTERN = `^[A-Za-z\\d$@$!%*#?&]{0,${PASSWORD_MAX_LENGTH}}$`;

const EMAIL_MAX_LENGTH = 100;
export const CORRECT_EMAIL_PATTERN = `^[A-Za-z\\d@_.]{0,${EMAIL_MAX_LENGTH}}$`;
