import * as React from 'react';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IMaskInput } from 'react-imask';
import { CORRECT_PASSWORD_PATTERN } from '../../../util/pattern';

const passwordMaskCustom = React.forwardRef<HTMLElement, any>((props, ref) => {
  const { onChange, ...other } = props;

  return (
    <IMaskInput
      // eslint-disable-next-line no-octal-escape
      mask={(value: string) => {
        const pattern = new RegExp(CORRECT_PASSWORD_PATTERN);
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

interface PasswordInputProps {
  password: string;
  handlePassword: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

function PasswordInput({ password, handlePassword }: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        id="password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        inputComponent={passwordMaskCustom}
        onChange={handlePassword}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
      {/* <FormHelperText id="outlined-weight-helper-text" sx={{ color: 'error.main' }}>
        {!validatePassword(profileInfo.password.value) &&
          '이메일 또는 패스워드가 잘 못 됐습니다.'}
      </FormHelperText> */}
    </FormControl>
  );
}

export default PasswordInput;
