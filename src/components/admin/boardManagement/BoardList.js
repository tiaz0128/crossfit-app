import React from 'react';
import styles from './BoardList.module.css';
// import UserTable from '../home/table/UserTable';
import { tabLinks } from './tabLinks';
import { Nav, Button } from 'react-bootstrap';
import { FaPen } from 'react-icons/fa';

function BoardList() {
  return (
    <div className={styles.board}>
      <Nav variant="tabs" defaultActiveKey="/home">
        {tabLinks.map(({ tabName, title }, idx) => (
          <Nav.Item key={idx}>
            <Nav.Link eventKey={`${tabName}`}>{title}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      <div className={styles.btn}>
        <Button variant="primary">
          <FaPen />
        </Button>
      </div>
    </div>
  );
}

export default BoardList;
