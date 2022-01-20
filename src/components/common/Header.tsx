import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Button, Stack, useMediaQuery } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { GUEST_MENUS, MEMBER_MENUS } from '../../constants/menuList';
import { logoOut } from '../../api/firebase';
import { logoutUser } from '../../modules/currentUser';

interface Props {
  drawerWidth: number;
}

export default function Header({ drawerWidth }: Props) {
  const [open, setOpen] = React.useState(false);
  // const screenSize = useMediaQuery('(min-width:900px)');

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const currentUser = useSelector((state: RootState) => state.currentUser);
  const dispatch = useDispatch();

  const memberPath = () => {
    const menus = currentUser ? MEMBER_MENUS : GUEST_MENUS;

    return menus.map(({ name, path }, index) => (
      <NavLink to={path} key={path} style={{ textDecoration: 'none' }}>
        <ListItem
          button
          onClick={() => {
            handleDrawerToggle();
          }}
        >
          <ListItemIcon sx={{ minWidth: '32px' }}>
            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
          </ListItemIcon>
          <ListItemText primary={name} />
        </ListItem>
      </NavLink>
    ));
  };

  const drawer = (
    <Stack direction="column" height="80%">
      <Box>
        <Toolbar />
        <Divider />
        <List>{memberPath()}</List>
      </Box>
      <Box display="flex" justifyContent={'center'} mt="auto">
        {currentUser ? (
          <Button
            disableRipple={true}
            color="secondary"
            fullWidth
            onClick={async () => {
              await logoOut();
              dispatch(logoutUser());
              handleDrawerToggle();
            }}
          >
            logout
          </Button>
        ) : (
          <NavLink to="/login" style={{ textDecoration: 'none', width: '100%' }}>
            <Button disableRipple={true} color="secondary" fullWidth>
              login
            </Button>
          </NavLink>
        )}
      </Box>
    </Stack>
  );

  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" m="0 auto">
            Crossfit 백호
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ flexShrink: { md: 0 } }} aria-label="mailbox folders">
        <Drawer
          // container={container}
          variant="temporary"
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
