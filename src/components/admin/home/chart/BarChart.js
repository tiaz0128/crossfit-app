import React, { PureComponent } from 'react';
import styles from './BarChart.module.css';
import { XAxis, YAxis, Tooltip, BarChart, CartesianGrid, Bar, ResponsiveContainer } from 'recharts';
import { data } from './chartData';

export default class Chart extends PureComponent {
  render() {
    return (
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
        <ResponsiveContainer width="100%" aspect={2}>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis
              dataKey="name"
              axisLine={{ stroke: 'none' }}
              tickLine={{ stroke: 'none' }}
              tick={{ fontSize: 13, fill: '#6b7d9c' }}
            />
            <YAxis
              axisLine={{ stroke: 'none' }}
              tickLine={{ stroke: 'none' }}
              padding={{ top: 10, bottom: 10 }}
              tick={{ fontSize: 13, fill: '#6b7d9c' }}
            />
            <Tooltip />
            <Bar dataKey="total" fill="#ff4318" radius={[10, 10, 10, 10]} barSize={10} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
