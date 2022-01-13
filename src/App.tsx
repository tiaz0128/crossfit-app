import { Box, CssBaseline } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { appTitle } from './appTitle';
// import Header from './components/admin/header/Header';
import Home from './components/admin/home/Home';
import Navigation from './components/admin/navigation/Navigation';
import BoardList from './components/admin/boardManagement/BoardList';
import styles from './components/Main.module.css';
import MemberList from './components/admin/memberManagement/MemberList';
import './App.css';
import Profile from './components/user/profile/Profile';
import LoginForm from './components/common/login/LoginForm';
import { useAuth } from './api/firebase';
import Loading from './components/common/Loading';
import { Link } from 'react-router-dom';
import Header from './components/common/Header';
import NotFound from './components/common/NotFound';
import DashBoard from './components/user/dashboard/DashBoard';
// import DashBoard from './components/dashboard/DashBoard';
// import Membership from './components/membership/Membership';
// import Profile from './components/profile/Profile';

const DRAWER_WIDTH = 200;

function App() {
  const [selectedPage, setSelectedPage] = useState(false);

  const handleSelectedPage = () => {
    setSelectedPage(true);
  };

  const [currentUser, setCurrentUser, loading, setLoading] = useAuth();

  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) navigate('/login');
    return;
  }, []);

  return (
    <div className="App">
      <CssBaseline />

      <Box sx={location.pathname !== '/login' ? { display: 'flex' } : {}}>
        {location.pathname !== '/login' && <Header drawerWidth={DRAWER_WIDTH} />}
        <Box
          component="main"
          sx={
            location.pathname !== '/login'
              ? {
                  flexGrow: 1,
                  p: 1,
                  mt: 10,
                  width: `calc(100% - ${DRAWER_WIDTH}px)`,
                }
              : {}
          }
        >
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="member" element={<MemberList />} />
            <Route path="board" element={<BoardList />} />
            <Route path="profile" element={<Profile />} />
            <Route
              path="login"
              element={
                <LoginForm currentUser={currentUser} loading={loading} setLoading={setLoading} />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </Box>

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
