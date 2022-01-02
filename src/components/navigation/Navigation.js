import React, { useState } from 'react';
import styles from './Navigation.module.css';
import { navLinks } from './navLinks';
import { Link } from 'react-router-dom';

function Navigation({ appTitle, onSelectedPage, display, layout }) {
  const [menu, setMenu] = useState('HOME');
  const displayType = display === 'list' ? styles.list : styles.grid;
  const layoutType = layout === 'layout' ? styles.layout : styles.basic;

  const handleClassNm = (e) => {
    const selectMenu = e.target.innerText;
    if (selectMenu !== '') {
      setMenu(e.target.innerText);
    }
  };

  const handleMenuClick = () => {
    onSelectedPage();
  };

  return (
    <section className={`${styles.select} ${layoutType}`}>
      <div className={styles.profile}>
        <img src={'./image/라이언.PNG'} alt="" />
      </div>
      <h1 className={styles.title}>{appTitle}</h1>
      <div className={styles.navigation}>
        <ul className={`${styles.container} ${displayType}`}>
          {navLinks.map(({ navName, icon, path }, idx) => (
            <li
              key={idx}
              className={`${styles.list} ${menu === navName ? styles.active : ''}`}
              onMouseOver={handleClassNm}
              onClick={handleMenuClick}
            >
              <a href="#">
                <span className={styles.icon}>
                  <ion-icon name={`${icon}`}></ion-icon>
                </span>
                <Link to={`${path}`} className={styles.text}>
                  {navName}
                </Link>
              </a>
            </li>
          ))}
          <div className={styles.indicator}></div>
        </ul>
      </div>
    </section>
  );
}

export default Navigation;
