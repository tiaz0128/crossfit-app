import React from 'react';
import styles from './Header.module.css';
import PagePath from './PagePath';
import Serch from './Serch';
import UserNav from './UserNav';

function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.pagePath}>
        <PagePath />
      </div>
      <div className={styles.serch}>
        <Serch />
        <UserNav />
      </div>
    </div>
  );
}

export default Header;
