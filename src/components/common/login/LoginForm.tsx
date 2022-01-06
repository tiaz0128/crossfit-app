import { Stack, Box, CardMedia, Button } from '@mui/material';
import { styled } from '@mui/system';
import * as React from 'react';

import EmailInput from '../form/EmailInput';
import PasswordInputProps from '../form/PasswordInput';

// interface LoginFormProps {

// }

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

function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <MainContainer>
      <BackgroundBox>
        <Stack
          component="section"
          sx={{
            width: '100%',
            maxWidth: '410px',
            height: '514px',
            p: 3,
            m: 2,
            border: '1px solid rgb(196, 196, 196)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            display: 'flex',
            justifyContent: 'space-evenly',
          }}
        >
          <CardMedia
            component="header"
            sx={{
              '&': {
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                // filter: 'grayscale(1)',
                margin: '0 auto 40px',
              },
            }}
            image="img/logo.jpg"
          />
          <Box sx={{ p: 1 }}>
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
              <EmailInput email={email} handleEmail={(e) => setEmail(e.target.value)} />
              <PasswordInputProps
                password={password}
                handlePassword={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="contained"
                size="large"
                type="submit"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                }}
              >
                LOGIN
              </Button>
            </Stack>
          </Box>
        </Stack>
      </BackgroundBox>
    </MainContainer>
  );
}

export default LoginForm;
