import React, { useContext, useState } from 'react';
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import { updateThematic } from '../../services/ThematicService';
//Context
import StateContext from '../../contexts/StateContext';
import Toaster from '../../utils/Toaster';

const UpdateThematicModal = (props) => {
    const GlobalState = useContext(StateContext);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        const fetchUpdate = async () => {
            try {
                const result = await updateThematic(props.thematic.id, e.target, GlobalState.userToken);
                setToastMessage("Thematic updated successfully!");
                setToastType("success");
                props.setupdated(true);
            } catch (error) {
                setToastMessage("Something went wrong.");
                setToastType("danger");
                // alert("Failed to Update Thematic");
            };
            setShowToast(true);
            props.onHide();
        };

        fetchUpdate();
    };

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
                {...props}
                size="lg"
                fade
                aria-hidden="true"
                aria-labelledby="contained-modal-title-vcenter" centered >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update Thematic : {props.thematic.thematicTitle}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="justify-content-evenly">
                        <Col sm={10}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="thematicTitle">
                                    <Form.Label>Thematic name</Form.Label>
                                    <Form.Control type="text" name="thematicTitle" required defaultValue={props.thematic.thematicTitle} placeholder="" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="sigle">
                                    <Form.Label>Sigle</Form.Label>
                                    <Form.Control type="text" name="sigle" defaultValue={props.thematic.sigle} placeholder="" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text" name="description" defaultValue={props.thematic.description} placeholder="" />
                                </Form.Group>

                                <Form.Group className='my-4'>
                                    <Button variant="primary" className='float-end' type="submit">
                                        Update
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" type="submit" onClick={props.onHide}>
                        Close
                    </Button>
                </Modal.Footer> */}
            </Modal>
        </>
    );
};

export default UpdateThematicModal;