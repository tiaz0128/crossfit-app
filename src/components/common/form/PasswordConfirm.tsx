import * as React from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IMaskInput } from 'react-imask';

const validateChangeInfo = () => {
  // const { value: password, change: changedPassword } = profileInfo.password;
  // if (changedPassword) {
  //   return isSamePassword(password, confirmPassword) && validatePassword(password);
  // }
  // return isChangeInfo();
};

// const passwordMaskCustom = React.forwardRef<HTMLElement, any>((props, ref) => {
//   const { onChange, ...other } = props;

//   return (
//     <IMaskInput
//       // eslint-disable-next-line no-octal-escape
//       mask={(value: string) => {
//         const pattern = new RegExp(CORRECT_PASSWORD_PATTERN);
//         return pattern.test(value);
//       }}
//       inputRef={ref}
//       onAccept={(value: any) => {
//         onChange({ target: { name: props.name, value } });
//       }}
//       {...other}
//     />
//   );
// });

interface PasswordConfirmProps {}

const PasswordConfirm: React.FunctionComponent<PasswordConfirmProps> = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState<boolean>(false);

  const [confirmPassword, setConfirmPassword] = React.useState<string>('');

  // React.useEffect(() => {
  //   if (open) getInitData(currentUser!.uid);
  //   return () => {
  //     setConfirmPassword('');
  //     setEditPhone(false);
  //     setShowPassword(false);
  //     setShowConfirmPassword(false);
  //   };
  // }, [open]);

  const handleConfirmPassword = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => setConfirmPassword(e.target.value);

  return (
    <>
      {/* <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={profileInfo.password.value}
          error={!validatePassword(profileInfo.password.value)}
          onChange={handleProfileInfo}
          inputComponent={passwordMaskCustom}
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
        <FormHelperText id="outlined-weight-helper-text" sx={{ color: 'error.main' }}>
          {!validatePassword(profileInfo.password.value) &&
            '대소문자/숫자/특수문자 2가지 이상 조합. 8~16'}
        </FormHelperText>
      </FormControl>
      <FormControl fullWidth variant="outlined">
        <InputLabel
          error={
            profileInfo.password.change &&
            !isSamePassword(profileInfo.password.value, confirmPassword)
          }
          htmlFor="outlined-adornment-password"
        >
          Password Confirm
        </InputLabel>
        <OutlinedInput
          id="confirmPassword"
          name="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          value={confirmPassword}
          disabled={!profileInfo.password.change}
          error={!isSamePassword(profileInfo.password.value, confirmPassword)}
          onChange={handleConfirmPassword}
          inputComponent={passwordMaskCustom}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                disabled={!profileInfo.password.change}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="confirmPassword"
        />
        {profileInfo.password.change && (
          <FormHelperText id="outlined-weight-helper-text" sx={{ color: 'error.main' }}>
            {!isSamePassword(profileInfo.password.value, confirmPassword) && 'not matched password'}
          </FormHelperText>
        )}
      </FormControl> */}
    </>
  );
};

export default PasswordConfirm;
