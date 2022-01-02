import React from 'react';
import styles from './Card.module.css';

function Card({ title, icon }) {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.iconBox}>
          <i className={`fas fa-${icon}`}></i>
        </div>
        <div className={styles.textBox}>
          <span>{title}</span>
          <h4>281</h4>
        </div>
      </div>
      <hr />
      <div className={styles.footer}>
        <p>
          <span>+55%</span>than lask week
        </p>
      </div>
    </div>
  );
}

export default Card;
