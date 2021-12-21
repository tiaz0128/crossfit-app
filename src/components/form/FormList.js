import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { getPost } from '../../api';

function FormList() {
  const [keys, setKeys] = useState([]);
  const [wods, setWods] = useState([]);

  const getData = async () => {
    const response = await getPost();
    return response.data;
  };

  useEffect(() => {
    const wodList = getData();
    setKeys(Object.keys(wodList[0]));
    setWods(wodList);
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {keys.map((title) => (
            <th key={title.id}>{title}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {wods.map((item) => (
          <tr>
            <td> {item[keys]} </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default FormList;
