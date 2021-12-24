import React from 'react';
import styles from './Home.module.css';
import Card from './Card';
import Chart from './Chart.js';

function Home() {
  return (
    <div className={styles.container}>
      <Card />
      <div className={styles.chart}>
        <div className={styles.header}>
          <div className={styles.title}>
            <h6>OVERVIEW</h6>
            <h2>Sales value</h2>
          </div>
          <div className={styles.buttons}>
            <div className={styles.month}>Month</div>
            <div className={styles.week}>Week</div>
          </div>
        </div>
        <Chart />
      </div>
    </div>
  );
}

export default Home;
