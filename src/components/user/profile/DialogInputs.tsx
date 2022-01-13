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
  Box,
  CardMedia,
  Stack,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

import PhotoCamera from '@mui/icons-material/PhotoCamera';

import { IMaskInput } from 'react-imask';

import ConfirmDialog from '../../common/ConfirmDialog';
import AlertDialog from '../../common/AlertDialog';

import { getUserData, putUser, useAuth } from '../../../api/firebase';
import Loading from '../../common/Loading';

import { ABOUT_MAX_LENGTH } from '../../../util/pattern';
import { validatePhone, validateTextLength } from '../../../util/validate';

const INIT_PROFILE_INFO = {
  name: '',
  birthday: '',
  nickName: '',
  userImg: { value: '', change: false },
  phone: { value: '', change: false },
  about: { value: '', change: false },
  infoYn: { value: '', change: false },
};

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

const Input = styled('input')({
  display: 'none',
});

const createProfileInfo = ({
  name,
  birthday,
  nickName,
  userImg,
  phone,
  about,
  infoYn,
}: {
  [key: string]: string;
}): State => {
  return {
    name,
    birthday,
    nickName,
    userImg: { value: userImg, change: false },
    phone: { value: phone, change: false },
    about: { value: about, change: false },
    infoYn: { value: infoYn, change: false },
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
  nickName: string;

  userImg: InputValue;
  phone: InputValue;
  about: InputValue;
  infoYn: InputValue;
}

export default function DialogInputs({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const [initData, setInitData] = React.useState<State | null>(null);
  const [profileInfo, setProfileInfo] = React.useState<State>(INIT_PROFILE_INFO);

  const [editPhone, setEditPhone] = React.useState<boolean>(false);

  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [openAlter, setOpenAlert] = React.useState<boolean>(false);

  const [currentUser, notUse, loading, setLoading] = useAuth();

  React.useEffect(() => {
    if (open) getInitData(currentUser!.uid);
    return () => {
      setEditPhone(false);
    };
  }, [open]);

  const getInitData = (uid: string) => {
    setLoading(true);

    getUserData(uid).then((data) => {
      setInitData(createProfileInfo(data));
      setProfileInfo(createProfileInfo(data));
      setLoading(false);
    });
  };

  const handleProfileInfo = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === 'about' && !validateTextLength(value, ABOUT_MAX_LENGTH)) return;

    if (name === 'infoYn') {
      value = profileInfo.infoYn.value === 'Y' ? 'N' : 'Y';
    }

    setProfileInfo({
      ...profileInfo,
      [e.target.name]: {
        value,
        change: value !== (initData![name] as InputValue).value,
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

  const closeConfirm = () => {
    setOpenConfirm(false);
  };

  const closeAlter = () => {
    setOpenAlert(false);
  };

  const isChangeInfo = () => {
    const { userImg, phone, about, infoYn } = profileInfo;
    return userImg.change || phone.change || about.change || infoYn.change;
  };

  const beforeClose = () => {
    if (isChangeInfo()) {
      return setOpenConfirm(true);
    }
    handleClose();
  };

  const resetAllChange = (change: boolean) => {
    let { userImg, phone, about, infoYn } = profileInfo;
    userImg = { ...userImg, change };
    phone = { ...phone, change };
    about = { ...about, change };
    infoYn = { ...infoYn, change };

    return { ...profileInfo, userImg, phone, about, infoYn };
  };

  if (loading) return <Loading visible={loading} fixed />;

  const handleOnSave = async () => {
    const { name, birthday, userImg, phone, about, infoYn } = profileInfo;
    await putUser(currentUser!.uid, {
      name,
      birthday,
      userImg: userImg.value,
      phone: phone.value,
      about: about.value,
      infoYn: infoYn.value,
    });
    setProfileInfo(resetAllChange(false));
    setOpenAlert(true);
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
                id="nickName"
                name="nickName"
                label="닉네임"
                variant="outlined"
                disabled
                fullWidth
                value={profileInfo.nickName}
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
            <FormGroup sx={{ mb: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={profileInfo.infoYn.value === 'Y'}
                    name="infoYn"
                    onChange={handleProfileInfo}
                  />
                }
                label="정보공개 (나이 / 등수)"
              />
            </FormGroup>
            <TextField
              id="about"
              name="about"
              label="about"
              placeholder={'자기소개를 해보세요!'}
              multiline
              rows={5}
              error={!validateTextLength(profileInfo.about.value, ABOUT_MAX_LENGTH)}
              helperText={
                !validateTextLength(profileInfo.about.value, ABOUT_MAX_LENGTH) &&
                `${ABOUT_MAX_LENGTH}글자 이하로 입려하세요`
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
              onClick={handleOnSave}
              disabled={!isChangeInfo()}
              sx={{
                cursor: isChangeInfo() ? 'cursor' : 'not-allowed',
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
        handleCloseConfirm={closeConfirm}
        handleCloseParent={handleClose}
      />

      <AlertDialog
        alertTitle={'알림'}
        alertDescription={'저장 되었습니다.'}
        openAlter={openAlter}
        handleCloseAlter={closeAlter}
      />
    </Box>
  );
}
