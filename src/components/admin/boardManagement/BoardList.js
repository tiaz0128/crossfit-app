import React, { useState } from 'react';
import styles from './BoardList.module.css';
import { tabLinks } from './tabLinks';
import { Nav, Button } from 'react-bootstrap';
import { FaPen } from 'react-icons/fa';
import UserTable from '../home/table/UserTable';

function BoardList() {
  const [boardTitle, setBoardTitle] = useState('공지사항');
  const handleTab = (e) => {
    console.log(e.currentTarget.innerText);
    setBoardTitle(e.currentTarget.innerText);
  };
  return (
    <div className={styles.tab}>
      <Nav variant="tabs" defaultActiveKey="/home">
        {tabLinks.map(({ tabName, title }, idx) => (
          <Nav.Item key={idx}>
            <Nav.Link eventKey={`${tabName}`} onClick={handleTab}>
              {title}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      <div className={styles.board}>
        <UserTable title={boardTitle} />
      </div>
      <div className={styles.btn}>
        <Button variant="primary">
          <FaPen />
        </Button>
      </div>
    </div>
  );
}

export default BoardList;
