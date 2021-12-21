import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { getPost } from '../../api';

function FormList() {
  const [keys, setKeys] = useState([]);
  const [wods, setWods] = useState([]);

  // const getData = async () => {
  //   const data = await getPost();
  //   return data;
  // };

  useEffect(async () => {
    const wodList = await getPost();
    setWods(wodList);
    setKeys(Object.keys(wodList[0]));
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {keys.map((title, index) => (
            <th key={index}>{title}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {wods.map(wod => (
          <tr key={wod.id} >
            {keys.map((key, index) => <td key={index}>{wod[key]}</td>)}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default FormList;
