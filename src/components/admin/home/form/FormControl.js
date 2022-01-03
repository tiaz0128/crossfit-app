import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

function FormControl() {
  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>항목</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>...</option>
          </Form.Select>
        </Form.Group>
      </Row>
      <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>제목</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>내용</Form.Label>
        <Form.Control placeholder="1234 Main St" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default FormControl;
