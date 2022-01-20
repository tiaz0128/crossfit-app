import React, { useEffect } from 'react';
import './App.css';
import { Box, CssBaseline } from '@mui/material';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import BoardList from './components/admin/boardManagement/BoardList';
import MemberList from './components/admin/memberManagement/MemberList';

import Profile from './components/user/profile/Profile';
import LoginForm from './components/common/login/LoginForm';

import Header from './components/common/Header';
import NotFound from './components/common/NotFound';
import DashBoard from './components/user/dashboard/DashBoard';
import LandingPage from './components/common/LandingPage';

import { MEMBER_MENUS } from './constants/menuList';
import useAuth from './hooks/useAuth';
import Loading from './components/common/Loading';

const DRAWER_WIDTH = 200;

function App() {
  const { currentUser, loading } = useAuth();

  let { pathname } = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    if (currentUser) return;
    if (!currentUser && loginUserMenu()) navigate('/', { replace: true });
  }, [pathname, currentUser]);

  const showHeader = () => {
    return !['/login'].includes(pathname);
  };

  const loginUserMenu = () => {
    return MEMBER_MENUS.find(({ path }) => '/' + path === pathname);
  };

  return (
    <div className="App">
      <CssBaseline />

      {!currentUser && <Loading visible={loading} fixed bgcolor />}

      {showHeader() ? (
        <Box sx={{ display: 'flex' }}>
          <Header drawerWidth={DRAWER_WIDTH} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 1,
              mt: 10,
              width: `calc(100% - ${DRAWER_WIDTH}px)`,
            }}
          >
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="member" element={<MemberList />} />
              <Route path="board" element={<BoardList />} />
              <Route path="profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
        </Box>
      ) : (
        <Box>
          <Box component="main">
            <Routes>
              <Route path="login" element={<LoginForm />} />
            </Routes>
          </Box>
        </Box>
      )}

      {/* <section className={styles.container}>
        <div className={styles.meun}>
          <Navigation
            appTitle={appTitle}
            onSelectedPage={handleSelectedPage}
            display={selectedPage ? 'list' : 'grid'}
            layout={selectedPage ? 'layout' : 'basic'}
          />
        </div>
        {selectedPage && (
          <div className={styles.content}>
            <div className={styles.header}>
              <Header />
            </div>
            <div className={styles.selectPage}>
              <Routes>
                <Route
                  path="/"
                  element={
                    currentUser?.uid ? <Home /> : <LoginForm uid={currentUser?.uid || null} />
                  }
                />
                <Route path="/member" element={<MemberList />} />
                <Route path="/board" element={<BoardList />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<LoginForm uid={currentUser?.uid || null} />} />
              </Routes>
            </div>
          </div>
        )}
      </section> */}
    </div>
  );
}

export default App;
