import React, { useContext } from 'react';
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import { updateCategory } from '../../services/CategoryService';
//Context
import StateContext from '../../contexts/StateContext';

const UpdateCategoryModal = (props) => {
    const GlobalState = useContext(StateContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateCategory(props.categorie.id, e.target, GlobalState.userToken)
            .then((result) => {
                alert(result);
                props.setupdated(true);
            },
                (error) => {
                    alert("Failed to Update Category");
                })
        props.onHide();
    };

    return (
        <div className="container">

            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update Category Information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="CategoryTitle">
                                    <Form.Label>CategoryTitle</Form.Label>
                                    <Form.Control type="text" name="categoryTitle" required defaultValue={props.categorie.categoryTitle} placeholder="" />
                                </Form.Group>

                                <Form.Group controlId="Description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows={3} name="description" defaultValue={props.categorie.description} placeholder="" />
                                </Form.Group>

                                <p></p>
                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" type="submit" onClick={props.onHide}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};


export default UpdateCategoryModal;

