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
import { SettingsInputAntennaTwoTone, Visibility, VisibilityOff } from '@mui/icons-material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import { setFullDateFormat } from '../../util/time';
import { IMaskInput } from 'react-imask';

import ConfirmDialog from './ConfirmDialog';

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
      onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
      {...other}
    />
  );
});

const Input = styled('input')({
  display: 'none',
});

// const aboutMaskCustom = React.forwardRef<HTMLElement, any>((props, ref) => {
//   const { onChange, ...other } = props;

//   return (
//     <IMaskInput
//       // eslint-disable-next-line no-octal-escape
//       mask={(value: string) => {
//         return /.+/.test(value);
//       }}
//       inputRef={ref}
//       onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
//       maxLength={300}
//       {...other}
//     />
//   );
// });

interface State {
  [key: string]: string | boolean;
  img: string;
  name: string;
  userId: string;
  birthday: string;
  phone: string;
  editPhone: boolean;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  about: string;
  changeValues: boolean;
}

export default function DialogInputs({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const [values, setValues] = React.useState<State>({
    img: 'img/profile.jpg',
    name: '주환석',
    userId: 'tiaz0128',
    birthday: setFullDateFormat(new Date('1987-10-17')),
    phone: '010-1234-5678',
    editPhone: false,
    password: '!1234',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
    about:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque molestias quos nemo veniam. Voluptatem cum accusantium quia repudiandae vel iusto aspernatur quod repellendus voluptas id, rerum alias enim eos quas!',
    changeValues: false,
  });

  const handleValue = (e: any) => {
    const name = e.target!.name as string;
    if (e.target.value !== values[name]) {
      setValues({ ...values, [e.target.name]: e.target.value, changeValues: true });
    }
  };

  const [openAlert, setOpenAlert] = React.useState(false);

  const handleAlert = () => {
    setOpenAlert(false);
  };

  const beforeClose = () => {
    if (values.changeValues) {
      return setOpenAlert(true);
    }
    handleClose();
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
                  },
                }}
                image={values.img}
              />
              <label htmlFor="icon-button-file">
                <Input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  onChange={({ target }: { target: HTMLInputElement }) => {
                    let fileList: FileList = target.files as FileList;
                    setValues({
                      ...values,
                      img: URL.createObjectURL(fileList[0]),
                      changeValues: true,
                    });
                  }}
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
              value={values.name}
            />
            <TextField
              id="userId"
              name="userId"
              label="아이디"
              variant="outlined"
              disabled
              fullWidth
              value={values.userId}
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
            value={values.birthday}
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
              value={values.phone}
              onChange={handleValue}
              inputComponent={TextMaskCustom}
              disabled={values.editPhone ? false : true}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle edit phone"
                    onClick={() => setValues({ ...values, editPhone: !values.editPhone })}
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
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleValue}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setValues({ ...values, showPassword: !values.showPassword })}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <InputLabel color="error" htmlFor="outlined-adornment-password">
              Password Confirm
            </InputLabel>
            <OutlinedInput
              id="confirmPassword"
              name="confirmPassword"
              type={values.showConfirmPassword ? 'text' : 'password'}
              value={values.confirmPassword}
              // disabled
              color="error"
              onChange={handleValue}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() =>
                      setValues({ ...values, showConfirmPassword: !values.showConfirmPassword })
                    }
                    edge="end"
                  >
                    {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="confirmPassword"
            />
            <FormHelperText id="outlined-weight-helper-text" sx={{ color: 'red' }}>
              not matched password
            </FormHelperText>
          </FormControl>

          <TextField
            id="about"
            name="about"
            label="about"
            multiline
            rows={6}
            variant="filled"
            fullWidth
            focused
            value={values.about}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} disabled={!values.changeValues}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
      <ConfirmDialog openAlert={openAlert} handleClose={handleAlert} />
    </div>
  );
}
