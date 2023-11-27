import React, { useState, useEffect, useContext } from 'react';
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import { updateInstitution, getCountries } from '../../services/InstitutionService';
//Context
import StateContext from '../../contexts/StateContext';
import Toaster from '../../utils/Toaster';

const UpdateInstitutionModal = (props) => {
    const GlobalState = useContext(StateContext);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        setCountries(getCountries());
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const fetchUpdate = async () => {
            try {
                const result = await updateInstitution(props.institution.id, e.target, GlobalState.userToken);
                // alert(result);
                setToastMessage("Institution updated successfully 🚀!");
                setToastType("success");
                props.setupdated(true);
            } catch (error) {
                // alert("Failed to Update Institution");
                setToastMessage("Something went wrong.");
                setToastType("danger");
            };
            setShowToast(true);
            props.onHide();
        };
        fetchUpdate();
    }

    return (
        <>

            <Toaster
                title="Update Institution!"
                message={toastMessage}
                showToast={showToast}
                type={toastType}
                onClose={() => setShowToast(false)}
            />

            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update Institution : {props.institution.sigle}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className='justify-content-evenly'>
                        <Col sm={10}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="institutionName">
                                    <Form.Label>Institution name</Form.Label>
                                    <Form.Control type="text" name="institutionName" required defaultValue={props.institution.institutionName} placeholder="" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="sigle">
                                    <Form.Label>Sigle</Form.Label>
                                    <Form.Control type="text" name="sigle" defaultValue={props.institution.sigle} required placeholder="" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="contactPerson">
                                    <Form.Label>Contact person</Form.Label>
                                    <Form.Control type="text" name="contactPerson" defaultValue={props.institution.contactPerson} required placeholder="" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="country">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Select aria-label="Default select countries" name="country" defaultValue={props.institution.country}>
                                        {countries.map((e, key) => {
                                            return <option key={key} value={e.value}>{e.name}</option>;
                                        })}
                                    </Form.Select>
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

export default UpdateInstitutionModal;