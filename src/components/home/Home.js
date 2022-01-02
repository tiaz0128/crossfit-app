import React from 'react';
import styles from './Home.module.css';
import Card from './card/Card';
import LineChart from './chart/LineChart.js';
import BarChart from './chart/BarChart.js';
import UserTable from './table/UserTable';

function Home() {
  return (
    <div className={styles.container}>
      <Card />
      <div className={styles.chart}>
        <LineChart />
        <BarChart />
      </div>

      <UserTable />
    </div>
  );
}

export default Home;
