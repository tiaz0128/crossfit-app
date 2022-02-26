import * as React from 'react';
import { Box } from '@mui/system';
import { Outlet } from 'react-router';
import Header from './common/Header';

const DRAWER_WIDTH = 200;

interface LayoutFrameProps {
  showHeader: boolean;
}

const LayoutFrame: React.FunctionComponent<LayoutFrameProps> = ({ showHeader }) => {
  return (
    <Box>
      {showHeader && <Header drawerWidth={DRAWER_WIDTH} />}
      <Box component="main" sx={showHeader ? { mt: 10 } : {}}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default LayoutFrame;
