import * as React from 'react';
import { User } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

import { Stack, Box, CardMedia, Button, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import CancelIcon from '@mui/icons-material/Cancel';

import EmailInput from '../form/EmailInput';
import PasswordInputProps from '../form/PasswordInput';
import Loading from '../Loading';

import { logoIn, logoOut, useAuth } from '../../../api/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../modules';
import { loginUser, logoutUser } from '../../../modules/currentUser';

const MainContainer = styled('main')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: '100vh',
  p: 0,
  [theme.breakpoints.up('sm')]: {
    p: 0,
  },
}));

const BackgroundBox = styled('div')(({ theme }) => ({
  '&': {
    backgroundImage: 'url("img/loginBg.jpg")',
    width: '100%',
    minHeight: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },

  [theme.breakpoints.up('sm')]: {
    backgroundImage: 'url("img/loginBBg.jpg")',
  },
}));

interface LoginFormProps {
  // currentUser: User | null;
  // loading: boolean;
  // setLoading: (value: boolean) => void;
}
// { currentUser, loading, setLoading }: LoginFormProps}
function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  // const [currentUser, loading, setLoading] = useAuth();

  const currentUser: User = useSelector((state: RootState) => state.currentUser as User);
  const dispatch = useDispatch();

  let navigate = useNavigate();

  // React.useEffect(() => {
  //   if (currentUser) navigate('/dashboard');
  // }, [currentUser]);

  const handleLogin = async () => {
    if (email && password) {
      setLoading(true);
      try {
        const UserImpl = await logoIn(email, password);
        dispatch(loginUser(UserImpl.user));
        setLoading(false);
        navigate('/dashboard');
      } catch {
        alert('Error!!!');
      }
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoOut();
      dispatch(logoutUser());
    } catch {
      alert('로그아웃 에러 발생!!');
    }
    setLoading(false);
  };

  return (
    <MainContainer>
      <BackgroundBox>
        <Stack
          component="section"
          sx={{
            width: '100%',
            minWidth: '360px',
            maxWidth: '400px',
            height: '514px',
            p: 3,
            m: 2,
            border: '1px solid rgb(196, 196, 196)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            display: 'flex',
            justifyContent: 'space-evenly',
          }}
        >
          <Stack display="flex" direction="row" position="relative">
            <CardMedia
              component="header"
              sx={{
                '&': {
                  width: '180px',
                  height: '180px',
                  borderRadius: '50%',
                  // filter: 'grayscale(1)',
                  margin: '0 auto',
                },
              }}
              image={currentUser ? 'img/profile.jpg' : 'img/logo.jpg'}
            />
            <IconButton
              color="warning"
              aria-label="Edit Profile"
              component="span"
              sx={{ p: 0, position: 'absolute', bottom: '0', left: '65%' }}
              onClick={() => handleLogout()}
            >
              {currentUser && <CancelIcon sx={{ color: 'red', fontSize: '40px' }} />}
            </IconButton>
          </Stack>
          <Box sx={{ p: 1 }}>
            {loading ? (
              <Loading visible={loading} />
            ) : (
              <Stack
                component="form"
                method="post"
                direction="column"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#fff',
                    mb: 4,
                  },
                }}
              >
                {currentUser ? (
                  <Stack
                    component="div"
                    sx={{
                      '&': { height: '177px' },
                      '& a': { textDecoration: 'none' },
                      '& button': { background: '#3f51b5' },
                    }}
                  >
                    <Typography variant="h5" my={2} textAlign="center">
                      반갑습니다! {currentUser.displayName || 'tiaz0128'}&nbsp;님
                    </Typography>
                    <Link to="/">
                      <Button variant="contained" size="large" fullWidth>
                        Home 으로 이동
                      </Button>
                    </Link>
                  </Stack>
                ) : (
                  <>
                    <EmailInput email={email} handleEmail={(e) => setEmail(e.target.value)} />
                    <PasswordInputProps
                      password={password}
                      handlePassword={(e) => setPassword(e.target.value)}
                    />
                  </>
                )}

                {currentUser ? (
                  <></>
                ) : (
                  <Button
                    variant="contained"
                    size="large"
                    color={currentUser ? 'error' : 'primary'}
                    type="submit"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      currentUser ? handleLogout() : handleLogin();
                    }}
                  >
                    {currentUser ? 'LOGOUT' : 'LOGIN'}
                  </Button>
                )}
              </Stack>
            )}
          </Box>
        </Stack>
      </BackgroundBox>
    </MainContainer>
  );
}

export default LoginForm;
