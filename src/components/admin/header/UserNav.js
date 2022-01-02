import React from 'react';
import styles from './UserNav.module.css';
import { FaUserAlt } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import { FaBell } from 'react-icons/fa';

function UserNav() {
  return (
    <div className={styles.items}>
      <button className={styles.item}>
        <FaUserAlt className="icon" size="16" color="#7b809a" />
      </button>
      <button className={styles.item}>
        <IoMdSettings className="icon" size="20" color="#7b809a" />
      </button>
      <button className={styles.item}>
        <FaBell className="icon" size="20" color="#7b809a" />
      </button>
    </div>
  );
}

export default UserNav;
