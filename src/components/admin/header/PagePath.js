import React from 'react';
import styles from './PagePath.module.css';
import { AiFillHome } from 'react-icons/ai';

function PagePath({ pageName }) {
  return (
    <div className={styles.container}>
      <div className={styles.pagePath}>
        <AiFillHome className="icon" size="15" color="rgb(172 178 188)" /> /
        <span>{pageName}HOME</span>
      </div>
      <h4 className={styles.pageName}>{pageName}HOME</h4>
    </div>
  );
}

export default PagePath;
