import React from 'react';
import styles from './UserTable.module.css';
import { Table } from 'react-bootstrap';
import PageNav from './pagination/PageNav';

function UserTable() {
  return (
    <>
      <div className={styles.header}>
        <h5>회원 리스트</h5>
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
        <PageNav />
      </div>
    </>
  );
}

export default UserTable;
