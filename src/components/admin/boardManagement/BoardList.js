import React, { useState } from 'react';
import styles from './BoardList.module.css';
import { tabLinks } from './tabLinks';
import { Nav, Button, Modal } from 'react-bootstrap';
import { FaPen } from 'react-icons/fa';
import UserTable from '../home/table/UserTable';
import FormControl from '../home/form/FormControl';

function BoardList() {
  const [boardTitle, setBoardTitle] = useState('공지사항');
  const [openModal, setOpenModal] = useState(false);

  const handleTab = (e) => {
    setBoardTitle(e.currentTarget.innerText);
  };

  const handleSelectList = () => {
    setOpenModal(true);
  };

  return (
    <>
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
          <Button variant="primary" onClick={handleSelectList}>
            <FaPen />
          </Button>
        </div>
      </div>
      {openModal && (
        <Modal
          size="lg"
          show={openModal}
          onHide={() => setOpenModal(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">{boardTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormControl />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default BoardList;
