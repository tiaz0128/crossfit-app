import { Box } from '@mui/material';
import * as React from 'react';
import MoonLoader from 'react-spinners/MoonLoader';

interface LoadingProps {
  visible: boolean;
  fixed?: boolean;
}

const Loading: React.FunctionComponent<LoadingProps> = ({ visible, fixed }) => {
  if (visible)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="218px"
        zIndex="5000"
        sx={fixed ? { position: 'fixed', left: 0, top: '40%' } : {}}
      >
        <MoonLoader size={70} color="#6b5ce7" />
      </Box>
    );
  return null;
};

export default Loading;
