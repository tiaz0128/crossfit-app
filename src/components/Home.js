import React, { useState } from 'react';
import styles from './Home.module.css';
import { appTitle } from '../appTitle';
import FormList from './form/FormList';
import Navigation from './navigation/Navigation';

function Home() {
  const [selectedPage, setSelectedPage] = useState(false);

  const handleSelectedPage = () => {
    setSelectedPage(true);
  };

  return (
    <section className={styles.content}>
      <div className={styles.meun}>
        <Navigation
          appTitle={appTitle}
          onSelectedPage={handleSelectedPage}
          display={selectedPage ? 'list' : 'grid'}
          layout={selectedPage ? 'layout' : 'basic'}
        />
      </div>
      {selectedPage && (
        <div className={styles.selectPage}>
          <FormList />
        </div>
      )}
    </section>
  );
}

export default Home;
