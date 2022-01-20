import * as React from 'react';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { IMaskInput } from 'react-imask';
import { CORRECT_EMAIL_PATTERN } from '../../../constants/pattern';

const emailMaskCustom = React.forwardRef<HTMLElement, any>((props, ref) => {
  const { onChange, ...other } = props;

  return (
    <IMaskInput
      // eslint-disable-next-line no-octal-escape
      mask={(value: string) => {
        const pattern = new RegExp(CORRECT_EMAIL_PATTERN);
        return pattern.test(value);
      }}
      inputRef={ref}
      onAccept={(value: any) => {
        onChange({ target: { name: props.name, value } });
      }}
      {...other}
    />
  );
});

interface EmailInputProps {
  email: string;
  handleEmail: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

function EmailInput({ email, handleEmail }: EmailInputProps) {
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor="outlined-adornment-email">E-mail</InputLabel>
      <OutlinedInput
        id="email"
        name="email"
        type="email"
        label="e-mail"
        value={email}
        inputComponent={emailMaskCustom}
        onChange={handleEmail}
      />
    </FormControl>
  );
}

export default EmailInput;
