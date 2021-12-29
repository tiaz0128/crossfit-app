import { CssBaseline } from '@mui/material';
import React from 'react';
import './App.css';
import DashBoard from './components/dashboard/DashBoard';
import Membership from './components/membership/Membership';
import Profile from './components/profile/Profile';

function App() {
  return (
    <div className="App">
      <CssBaseline />
      {/* <Membership /> */}
      {/* <DashBoard /> */}
      <Profile />
    </div>
  );
}

export default App;
