import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  FormHelperText,
  Box,
  CardMedia,
  Stack,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import { IMaskInput } from 'react-imask';

import ConfirmDialog from './ConfirmDialog';
import AlertDialog from './AlertDialog';

import { getProfile, setProfile } from '../../../api';

const INIT_PROFILE_INFO = {
  name: '',
  birthday: '',
  userImg: { value: '', change: false },
  phone: { value: '', change: false },
  password: { value: '', change: false },
  about: { value: '', change: false },
};

const ABOUT_MAX_LENGTH = 300;
const VALIDATE_PHONE_PATTERN = `^010-[0-9]{3,4}-[0-9]{4}$`;

const PASSWORD_MAX_LENGTH = 16;
const PASSWORD_MIN_LENGTH = 8;
const CORRECT_PASSWORD_PATTERN = `^[A-Za-z\\d$@$!%*#?&]{0,${PASSWORD_MAX_LENGTH}}$`;
const VALIDATE_PASSWORD_PATTERN = `^(?=.*[A-Za-z0-9])(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{${PASSWORD_MIN_LENGTH},${PASSWORD_MAX_LENGTH}}$`;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const phoneMaskCustom = React.forwardRef<HTMLElement, any>((props, ref) => {
  const { onChange, ...other } = props;

  return (
    <IMaskInput
      // eslint-disable-next-line no-octal-escape
      mask="\0\1\0-000[0]-0000"
      inputRef={ref}
      onAccept={(value: any) => {
        onChange({ target: { name: props.name, value } });
      }}
      {...other}
    />
  );
});

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

const Input = styled('input')({
  display: 'none',
});

const createProfileInfo = ({
  name,
  birthday,
  userImg,
  phone,
  password,
  about,
}: {
  [key: string]: string;
}): State => {
  return {
    name,
    birthday,
    userImg: { value: userImg, change: false },
    phone: { value: phone, change: false },
    password: { value: password, change: false },
    about: { value: about, change: false },
  };
};

interface InputValue {
  [key: string]: string | boolean;
  value: string;
  change: boolean;
}
interface State {
  [key: string]: string | InputValue;
  name: string;
  birthday: string;

  userImg: InputValue;
  phone: InputValue;
  password: InputValue;
  about: InputValue;
}

export default function DialogInputs({
  open,
  handleClose,
  userId,
}: {
  open: boolean;
  handleClose: () => void;
  userId: string;
}) {
  const [initData, setInitData] = React.useState<State | null>(null);
  const [profileInfo, setProfileInfo] = React.useState<State>(INIT_PROFILE_INFO);
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');

  const [editPhone, setEditPhone] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState<boolean>(false);

  const [openConfirm, setOpenDialog] = React.useState(false);
  const [openAlter, setOpenAlert] = React.useState<boolean>(false);

  const getInitData = () => {
    getProfile(userId)
      .then((data) => {
        const init = createProfileInfo(data);
        setInitData(init);
        setProfileInfo(init);
        setConfirmPassword('');
      })
      .catch((err) => setProfileInfo(INIT_PROFILE_INFO));
  };

  React.useEffect(() => {
    if (!initData) {
      getInitData();
    } else if (isSamePassword(profileInfo.password.value, initData.password.value)) {
      setConfirmPassword('');
    }
  }, [profileInfo]);

  const handleProfileInfo = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const name = e.target.name;

    if (name === 'about' && !validateTextLength(e.target.value, ABOUT_MAX_LENGTH)) return;

    setProfileInfo({
      ...profileInfo,
      [e.target.name]: {
        value: e.target.value,
        change: e.target.value !== (initData![name] as InputValue).value,
      },
    });
  };

  const handleUserImg = ({ target }: { target: HTMLInputElement }) => {
    let fileList: FileList = target.files as FileList;

    setProfileInfo({
      ...profileInfo,
      userImg: { value: URL.createObjectURL(fileList[0]), change: true },
    });
  };

  const handleConfirmPassword = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => setConfirmPassword(e.target.value);

  const closeConfirm = () => {
    setOpenDialog(false);
  };

  const closeAlter = () => {
    setOpenAlert(false);
  };

  const isSamePassword = (password: string, comparePassword: string) => {
    return comparePassword === password;
  };

  const isChangeInfo = () => {
    const { userImg, phone, password, about } = profileInfo;
    return userImg.change || phone.change || password.change || about.change;
  };

  const validateChangeInfo = () => {
    const { value: password, change: changedPassword } = profileInfo.password;
    if (changedPassword) {
      return isSamePassword(password, confirmPassword) && validatePassword(password);
    }
    return isChangeInfo();
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

  const beforeClose = () => {
    if (isChangeInfo()) {
      return setOpenDialog(true);
    }
    handleClose();
  };

  const resetAllChange = (change: boolean) => {
    let { userImg, phone, password, about } = profileInfo;
    userImg = { ...userImg, change };
    phone = { ...phone, change };
    password = { ...password, change };
    about = { ...about, change };

    return { ...profileInfo, userImg, phone, password, about };
  };

  return (
    <Box>
      <BootstrapDialog
        onClose={beforeClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{ '& .MuiFormControl-root': { mb: 3 } }}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={beforeClose}>
          개인 정보 수정
        </BootstrapDialogTitle>

        <Box component="form">
          <DialogContent dividers>
            <Box display="flex" justifyContent="center" height={140} mb={1}>
              <Stack
                position="relative"
                sx={{
                  '&:hover img': {
                    opacity: 0.2,
                  },
                  '&:hover span': {
                    opacity: 1,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    '&': {
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      boxShadow: '-2px 2px 16px 1px #b0c4de',
                      filter: profileInfo.userImg.value ? '' : 'grayscale(1)',
                    },
                  }}
                  image={profileInfo.userImg.value || 'img/logo.jpg'}
                />
                <label htmlFor="icon-button-file">
                  <Input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    onChange={handleUserImg}
                  />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    sx={{
                      position: 'absolute',
                      top: '30px',
                      left: '27px',
                      opacity: 0,
                      fontSize: '50px',
                    }}
                  >
                    <PhotoCamera fontSize="inherit" color="primary" />
                  </IconButton>
                </label>
              </Stack>
            </Box>
            <Stack direction="row" spacing={2}>
              <TextField
                id="name"
                name="name"
                label="이름"
                variant="outlined"
                disabled
                fullWidth
                value={profileInfo.name}
              />
              <TextField
                id="userId"
                name="userId"
                label="아이디"
                variant="outlined"
                disabled
                fullWidth
                value={userId}
              />
            </Stack>
            <TextField
              id="birthday"
              name="birthday"
              label="생년월일"
              type="date"
              variant="outlined"
              fullWidth
              disabled
              value={profileInfo.birthday}
            />
            <FormControl
              fullWidth
              variant="outlined"
              sx={{
                '& legend': {
                  width: 'auto',
                },
                '& label': {
                  background: '#fff',
                },
              }}
            >
              <InputLabel error={!validatePhone(profileInfo.phone.value)}>
                &nbsp;전화번호&nbsp;
              </InputLabel>
              <OutlinedInput
                id="phone"
                name="phone"
                error={!validatePhone(profileInfo.phone.value)}
                value={profileInfo.phone.value}
                onChange={handleProfileInfo}
                inputComponent={phoneMaskCustom}
                disabled={editPhone ? false : true}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle edit phone"
                      onClick={() => setEditPhone(!editPhone)}
                      edge="end"
                    >
                      <EditIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl fullWidth variant="outlined">
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
                  {!isSamePassword(profileInfo.password.value, confirmPassword) &&
                    'not matched password'}
                </FormHelperText>
              )}
            </FormControl>
            <TextField
              id="about"
              name="about"
              label="about"
              placeholder={profileInfo.about.value || '자기소개를 해보세요!'}
              multiline
              rows={5}
              error={!validateTextLength(profileInfo.about.value, ABOUT_MAX_LENGTH)}
              helperText={
                !validateTextLength(profileInfo.about.value, ABOUT_MAX_LENGTH) &&
                '300글자 이하로 입려하세요'
              }
              variant="filled"
              fullWidth
              focused
              value={profileInfo.about.value}
              onChange={handleProfileInfo}
            />
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={async () => {
                const { name, birthday, userImg, phone, password, about } = profileInfo;
                await setProfile(userId, {
                  name,
                  birthday,
                  userImg: userImg.value,
                  phone: phone.value,
                  password: password.value,
                  about: about.value,
                });
                setProfileInfo(resetAllChange(false));
                setOpenAlert(true);
              }}
              disabled={!validateChangeInfo()}
              sx={{
                cursor: validateChangeInfo() ? 'cursor' : 'not-allowed',
              }}
            >
              Save changes
            </Button>
          </DialogActions>
        </Box>
      </BootstrapDialog>
      <ConfirmDialog
        openConfirm={openConfirm}
        confirmTitle={'변경'}
        confirmDescription={'변경된 데이터가 있습니다. 저장하지 않고 닫겠습니까?'}
        closeConfirm={closeConfirm}
        handleClose={handleClose}
      />

      <AlertDialog
        alertTitle="알림"
        alertDescription="저장 되었습니다."
        openAlter={openAlter}
        getSavedData={getInitData}
        closeAlter={closeAlter}
      />
    </Box>
  );
}
