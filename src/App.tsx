import React from 'react';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { appTitle } from './appTitle';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Navigation from './components/navigation/Navigation';
import BoardList from './components/boardManagement/BoardList';
// import './App.css';
import styles from './components/Main.module.css';
import MemberList from './components/memberManagement/MemberList';

function App() {
  const [selectedPage, setSelectedPage] = useState(false);

  const handleSelectedPage = () => {
    setSelectedPage(true);
  };
  return (
    <div className="App">
      <section className={styles.container}>
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
                <Route path="/" element={<Home />} />
                <Route path="/member" element={<MemberList />} />
                <Route path="/board" element={<BoardList />} />
              </Routes>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
