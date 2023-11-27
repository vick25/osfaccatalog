import React, { useContext, useState } from 'react';
import { Alert, Button, Modal, Row, Col, Form } from 'react-bootstrap';
import { addThematic } from '../../services/ThematicService';
import Toaster from '../../utils/Toaster';
//Context
import StateContext from '../../contexts/StateContext';

const AddThematic = (props) => {
  const { setupdated, ...rest } = props;
  const GlobalState = useContext(StateContext);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const fetchCreate = async () => {
      try {
        const result = await addThematic(e.target, GlobalState.userToken);
        // alert(result);
        console.log(result);
        setToastMessage("Thematic added successfully 🚀!");
        setToastType("success");
        props.setupdated(true);
      } catch (error) {
        // console.log(error);
        setToastMessage("Something went wrong.");
        setToastType("danger");
        // alert("Failed to Add Thematic");
      };

      setShowToast(true);
      props.onHide();
    }
    fetchCreate();
  }

  return (
    <>

      <Toaster
        title="Thematic!"
        message={toastMessage}
        showToast={showToast}
        type={toastType}
        onClose={() => setShowToast(false)}
      />

      <Modal
        {...rest}
        backdrop="static"
        keyboard={false}
        size="lg"
        fade
        aria-hidden="true"
        aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add Thematic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="justify-content-evenly">
            <Col sm={10}>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="thematicTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" name="thematicTitle" placeholder="Thematic title" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="sigle">
                  <Form.Label>Sigle</Form.Label>
                  <Form.Control type="text" name="sigle" placeholder="Thematic sigle" required />
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

export default AddThematic;