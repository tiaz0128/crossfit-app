import * as React from 'react';
import './App.css';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import BoardList from './components/admin/boardManagement/BoardList';
import MemberList from './components/admin/memberManagement/MemberList';

import Profile from './components/user/profile/Profile';
import LoginForm from './components/common/login/LoginForm';

import NotFound from './components/common/NotFound';
import DashBoard from './components/user/dashboard/DashBoard';
import LandingPage from './components/common/LandingPage';

import useAuth from './hooks/useAuth';
import Loading from './components/common/Loading';
import LayoutFrame from './components/LayoutFrame';
import Membership from './components/user/account/Account';

function App() {
  const { currentUser, loading, pathname } = useAuth();

  const showHeader = () => {
    return !['/login'].includes(pathname);
  };

  if (loading) return <Loading visible={loading} fixed bgcolor />;

  return (
    <div className="App">
      <CssBaseline />

      <LayoutFrame showHeader={showHeader()} />

      <Routes>
        <Route path="/">
          <Route index element={currentUser ? <DashBoard /> : <LandingPage />} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="member" element={<MemberList />} />
          <Route path="board" element={<BoardList />} />
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="account" element={<Membership />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
