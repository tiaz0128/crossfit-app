import React from 'react';
import styles from './Card.module.css';

import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';

function InfoCard() {
  return (
    <ul className={styles.container}>
      <li className={styles.card}>
        <div className={styles.content}>
          <div className={styles.iconBox}>
            <AssignmentTurnedInRoundedIcon sx={{ fontSize: '32px' }} />
          </div>
          <div className={styles.textBox}>
            <span>등록 기간 출석률</span>
            <h4>68.5%</h4>
          </div>
        </div>
        <hr />
        <div className={styles.footer}>
          <p>
            <span>+55%</span> 지난 기간 보다
          </p>
        </div>
      </li>
    </ul>
  );
}

export default InfoCard;
