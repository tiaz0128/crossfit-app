import React, { useState } from 'react';
import styles from './Navigation.module.css';
import { navLinks } from './navLinks';

function Navigation({ appTitle, onSelectedPage, display, layout }) {
  const [menu, setMenu] = useState('HOME');
  const displayType = display === 'list' ? styles.list : styles.grid;
  const layoutType = layout === 'layout' ? styles.layout : styles.basic;

  const handleClassNm = (e) => {
    const str = e.target.innerText;
    if (str !== '') {
      setMenu(e.target.innerText);
    }
  };

  const handleClick = () => {
    console.log('gg');
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
          {navLinks.map(({ navName, icon }, idx) => (
            <li
              key={idx}
              className={`${styles.list} ${menu === navName ? styles.active : ''}`}
              onMouseOver={handleClassNm}
              onClick={handleClick}
            >
              <a href="#">
                <span className={styles.icon}>
                  <ion-icon name={`${icon}`}></ion-icon>
                </span>
                <span className={styles.text}>{navName}</span>
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
