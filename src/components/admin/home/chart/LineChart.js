import React, { PureComponent } from 'react';
import styles from './LineChart.module.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { data } from './chartData';

export default class Chart extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/line-chart-width-reference-line-edjv0';

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
        <ResponsiveContainer width="100%" height="30vh" aspect={3}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
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
            <Tooltip wrapperStyle={{ backgroundColor: 'red' }} />
            <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
