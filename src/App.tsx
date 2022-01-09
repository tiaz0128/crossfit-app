import { CssBaseline } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { appTitle } from './appTitle';
import Header from './components/admin/header/Header';
import Home from './components/admin/home/Home';
import Navigation from './components/admin/navigation/Navigation';
import BoardList from './components/admin/boardManagement/BoardList';
import styles from './components/Main.module.css';
import MemberList from './components/admin/memberManagement/MemberList';
import './App.css';
import Profile from './components/user/profile/Profile';
import LoginForm from './components/common/login/LoginForm';
import { useAuth } from './api/firebase';
// import DashBoard from './components/dashboard/DashBoard';
// import Membership from './components/membership/Membership';
// import Profile from './components/profile/Profile';

function App() {
  const [selectedPage, setSelectedPage] = useState(false);

  const handleSelectedPage = () => {
    setSelectedPage(true);
  };

  const [currentUser, setCurrentUser] = useAuth();

  return (
    <div className="App">
      <CssBaseline />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="member" element={<MemberList />} />
        <Route path="board" element={<BoardList />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<LoginForm uid={currentUser?.uid || null} />} />
        <Route path="*" element={<>Go to home</>} />
      </Routes>

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
