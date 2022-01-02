import React from 'react';
import styles from './UserTable.module.css';
import { Table } from 'react-bootstrap';
// import PageNav from './pagination/PageNav';
import Pagination from '@mui/material/Pagination';

function UserTable({ title }) {
  return (
    <div className={styles.table}>
      <div className={styles.header}>
        <h5>{title}</h5>
      </div>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
      <div className={styles.footer}>
        {/* <PageNav /> */}
        <Pagination count={10} variant="outlined" color="primary" />
      </div>
    </div>
  );
}

export default UserTable;
