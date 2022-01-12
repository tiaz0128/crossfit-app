import { CardMedia, List, Stack, Typography } from '@mui/material';
import * as React from 'react';

interface NotFoundProps {}

const NotFound: React.FunctionComponent<NotFoundProps> = () => {
  return (
    <Stack>
      <CardMedia
        sx={{
          '&': {
            minHeight: '100%',
            width: '100%',
            height: '100vh',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundPosition: '50% 0',
            backgroundSize: 'cover',
            // filter: 'grayscale(1)',
            position: 'fixed',
            zIndex: '-1',
            top: 0,
            left: 0,
          },
        }}
        image={'img/no-rep-bg.jpg'}
      />
      <List sx={{ color: '#fff', textAlign: 'center', mt: 5 }}>
        <Typography component="h1" variant="h4">
          SORRY, THAT'S A "NO&nbsp;REP!"
        </Typography>
        <Typography component="h3" variant="h6">
          This page does not exist.
        </Typography>
      </List>
    </Stack>
  );
};

export default NotFound;
