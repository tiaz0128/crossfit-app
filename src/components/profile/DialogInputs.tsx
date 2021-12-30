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

import { setFullDateFormat } from '../../util/time';
import { IMaskInput } from 'react-imask';

import ConfirmDialog from './ConfirmDialog';
import AlertDialog from './AlertDialog';

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

// const customMask = function (value: string) {
//   var pattern = new RegExp(/^[0-9-]+$/i);
//   console.log(value, pattern.test(value));
//   return pattern.test(value);
// };

const TextMaskCustom = React.forwardRef<HTMLElement, any>((props, ref) => {
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

const Input = styled('input')({
  display: 'none',
});

interface InputValue {
  [key: string]: string | string[] | boolean;
  value: string | string[] | boolean;
  change: boolean;
}
interface State {
  [key: string]: string | boolean | InputValue;
  name: string;
  userId: string;
  birthday: string;

  editPhone: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;

  userImg: InputValue;
  phone: InputValue;
  password: InputValue;
  about: InputValue;
}

const initData: State = {
  name: '주환석',
  userId: 'tiaz0128',
  birthday: setFullDateFormat(new Date('1987-10-17')),

  editPhone: false,
  showPassword: false,
  showConfirmPassword: false,

  userImg: { value: '', change: false },
  phone: { value: '010-1234-5678', change: false },
  password: { value: '!1234', change: false },
  about: { value: '', change: false },
};

export default function DialogInputs({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const [profileInfo, setProfileInfo] = React.useState<State>(initData);
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const [openConfirm, setOpenDialog] = React.useState(false);
  const [openAlter, setOpenAlert] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!open) {
      setConfirmPassword('');
      setProfileInfo(initData);
    }
  }, [open]);

  const handleProfileInfo = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const name = e.target!.name as string;
    if (e.target.value !== (profileInfo[name] as InputValue).value) {
      setProfileInfo({
        ...profileInfo,
        [e.target.name]: {
          value: e.target.value,
          change: e.target.value !== (initData[name] as InputValue).value,
        },
      });
    }
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

  const isSamePassword = () => {
    return confirmPassword === profileInfo.password.value;
  };

  const isChangeInfo = () => {
    return (
      profileInfo.password.change ||
      profileInfo.userImg.change ||
      profileInfo.phone.change ||
      profileInfo.about.change
    );
  };

  const validateChangeInfo = () => {
    if (profileInfo.password.change) {
      return isSamePassword();
    }
    return isChangeInfo();
  };

  const beforeClose = () => {
    if (isChangeInfo()) {
      return setOpenDialog(true);
    }
    handleClose();
  };

  const resetAllChange = (change: boolean) => {
    const userImg: InputValue = { ...profileInfo.userImg, change };
    const phone: InputValue = { ...profileInfo.phone, change };
    const password: InputValue = { ...profileInfo.password, change };
    const about: InputValue = { ...profileInfo.about, change };

    return { ...profileInfo, userImg, phone, password, about };
  };

  return (
    <div>
      <BootstrapDialog
        onClose={beforeClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{ '& .MuiFormControl-root': { mb: 3 } }}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={beforeClose}>
          개인 정보 수정
        </BootstrapDialogTitle>

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
                image={(profileInfo.userImg.value as string) || 'img/logo.jpg'}
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
              value={profileInfo.userId}
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
            <InputLabel>&nbsp;전화번호&nbsp;</InputLabel>
            <OutlinedInput
              id="phone"
              name="phone"
              value={profileInfo.phone.value}
              onChange={handleProfileInfo}
              inputComponent={TextMaskCustom}
              disabled={profileInfo.editPhone ? false : true}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle edit phone"
                    onClick={() =>
                      setProfileInfo({ ...profileInfo, editPhone: !profileInfo.editPhone })
                    }
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
              type={profileInfo.showPassword ? 'text' : 'password'}
              value={profileInfo.password.value}
              onChange={handleProfileInfo}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() =>
                      setProfileInfo({ ...profileInfo, showPassword: !profileInfo.showPassword })
                    }
                    edge="end"
                  >
                    {profileInfo.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <InputLabel
              color={isSamePassword() ? 'primary' : 'error'}
              htmlFor="outlined-adornment-password"
            >
              Password Confirm
            </InputLabel>
            <OutlinedInput
              id="confirmPassword"
              name="confirmPassword"
              type={profileInfo.showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              disabled={!profileInfo.password.change}
              color={isSamePassword() ? 'primary' : 'error'}
              onChange={handleConfirmPassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    disabled={!profileInfo.password.change}
                    onClick={() =>
                      setProfileInfo({
                        ...profileInfo,
                        showConfirmPassword: !profileInfo.showConfirmPassword,
                      })
                    }
                    edge="end"
                  >
                    {profileInfo.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="confirmPassword"
            />
            {profileInfo.password.change && (
              <FormHelperText id="outlined-weight-helper-text" sx={{ color: 'red' }}>
                {!isSamePassword() && 'not matched password'}
              </FormHelperText>
            )}
          </FormControl>

          <TextField
            id="about"
            name="about"
            label="about"
            placeholder={(profileInfo.about.value as string) || '자기소개를 해보세요!'}
            multiline
            rows={5}
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
            onClick={() => {
              setProfileInfo(resetAllChange(false));
              setOpenAlert(true);
            }}
            disabled={!validateChangeInfo()}
          >
            Save changes
          </Button>
        </DialogActions>
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
        closeAlter={closeAlter}
      />
    </div>
  );
}
