import { Box, Theme } from '@mui/material';
import * as React from 'react';
import MoonLoader from 'react-spinners/MoonLoader';

const setLoadingStyle = (fixed?: boolean, bgcolor?: boolean): any => {
  if (fixed && bgcolor)
    return {
      position: 'fixed',
      left: 0,
      top: 0,
      with: '100%',
      height: '100vh',
      backgroundColor: 'rgba(34, 34, 34, 1)',
    };

  if (fixed) return { position: 'fixed', left: 0, top: 0, height: '100vh' };
  return {};
};

interface LoadingProps {
  visible: boolean;
  fixed?: boolean;
  bgcolor?: boolean;
}

const Loading: React.FunctionComponent<LoadingProps> = ({ visible, fixed, bgcolor }) => {
  if (visible)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="218px"
        zIndex="5000"
        sx={setLoadingStyle(fixed, bgcolor)}
      >
        <MoonLoader size={70} color="#6b5ce7" />
      </Box>
    );
  return null;
};

export default Loading;
