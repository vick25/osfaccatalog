import React, { useContext } from 'react';
import { Button, Modal, Row, Col, Form } from 'react-bootstrap';
//Context
import StateContext from '../../contexts/StateContext';
import { addCategory } from '../../services/CategoryService';

const AddCategory = (props) => {
  const { setupdated, ...rest } = props;
  const GlobalState = useContext(StateContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    addCategory(e.target, GlobalState.userToken)
      .then((result) => {
        console.log(result);
        alert(result);
        props.setupdated(true);
      },
        (error) => {
          console.log(error);
          alert("Failed to Add Category");
        })
    props.onHide();
  }

  return (
    <>
      <Modal
        {...rest}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={6}>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="categoryTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" name="categoryTitle" placeholder="Category title" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={3} name="description" />
                </Form.Group>

                <Form.Group>
                  <Button variant="primary" type="submit">
                    Save changes
                  </Button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddCategory;