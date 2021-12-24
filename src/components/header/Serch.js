import React from 'react';
// import styles from './Serch.module.css';
import { Form, FormControl, Button } from 'react-bootstrap';

function Serch() {
  return (
    <Form className="d-flex">
      <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search" />
      <Button variant="outline-success">Search</Button>
    </Form>
  );
}

export default Serch;
