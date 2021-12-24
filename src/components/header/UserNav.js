import React from 'react';
import styles from './UserNav.module.css';
import { FaUserCircle } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import { FaBell } from 'react-icons/fa';

function UserNav() {
  return (
    <div className={styles.items}>
      <FaUserCircle className="icon" size="20" color="#7b809a" />
      <IoMdSettings className="icon" size="20" color="#7b809a" />
      <FaBell className="icon" size="20" color="#7b809a" />
    </div>
  );
}

export default UserNav;
