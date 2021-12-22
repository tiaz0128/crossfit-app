import React, { useEffect, useState } from 'react';
import { Table, Modal } from 'react-bootstrap';
import { getPost } from '../../api';
import FormInfo from './FormInfo';

function FormList() {
  const [keys, setKeys] = useState([]);
  const [wods, setWods] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(async () => {
    const wodList = await getPost();
    setWods(wodList);
    setKeys(Object.keys(wodList[0]));
  }, []);

  const handleModal = () => {
    setShow(true);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            {keys.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {wods.map((wod) => (
            <tr key={wod.id} onClick={handleModal}>
              {keys.map((key, index) => (
                <td key={index}>{wod[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <FormInfo />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default FormList;
