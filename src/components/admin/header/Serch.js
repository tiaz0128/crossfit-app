import React from 'react';
// import styles from './Serch.module.css';
import { Form, FormControl } from 'react-bootstrap';

function Serch() {
  return (
    <Form className="d-flex" style={{ marginRight: '1rem', flex: '1 1 65%' }}>
      <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search" />
      {/* <Button variant="outline-success">Search</Button> */}
    </Form>
  );
}

export default Serch;
