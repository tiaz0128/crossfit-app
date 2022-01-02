import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import styles from './Main.module.css';
import { appTitle } from '../appTitle';
import Header from './header/Header';
import Navigation from './navigation/Navigation';
import Home from './home/Home';
import BoardList from './boardManagement/BoardList';

function Main() {
  const [selectedPage, setSelectedPage] = useState(false);

  const handleSelectedPage = () => {
    setSelectedPage(true);
  };

  return (
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
              <Route path="/border" element={<BoardList />} />
            </Routes>
          </div>
        </div>
      )}
    </section>
  );
}

export default Main;
