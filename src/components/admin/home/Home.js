import React from 'react';
import styles from './Home.module.css';
import Card from './card/Card';
import LineChart from './chart/LineChart.js';
import BarChart from './chart/BarChart.js';
import UserTable from './table/UserTable';
import { cardLinks } from './card/cardLinks';

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {cardLinks.map(({ title, icon }, idx) => (
          <Card title={title} icon={icon} key={idx} />
        ))}
      </div>
      <div className={styles.chart}>
        <LineChart />
        <BarChart />
      </div>

      <UserTable />
    </div>
  );
}

export default Home;
