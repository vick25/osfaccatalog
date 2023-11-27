import React, { useState, useEffect, useContext } from 'react';
import { Button, Form, Modal, Row, Col } from 'react-bootstrap';
import { addInstitution, getCountries } from '../../services/InstitutionService';
//Context
import StateContext from '../../contexts/StateContext';
import Toaster from '../../utils/Toaster';

const AddInstitution = (props) => {
    const GlobalState = useContext(StateContext);
    const { setupdated, ...rest } = props;

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");

    const [countries, setCountries] = useState([]);
    const [fieldCountry, setFieldCountry] = useState('Congo, The Democratic Republic of the');

    useEffect(() => {
        setCountries(getCountries());
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const addInst = async () => {
            try {
                const result = await addInstitution(e.target, GlobalState.userToken);
                setToastMessage("Institution added successfully 🚀!");
                setToastType("success");
                props.setupdated(true);
            } catch (error) {
                // alert("Failed to Add Institution");
                setToastMessage("Something went wrong.");
                setToastType("danger");
            }
            setShowToast(true);
            props.onHide();
        }
        addInst();
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
                aria-labelledby="contained-modal-ai-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-ai-title-vcenter">Add Institution</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="justify-content-evenly">
                        <Col sm={10}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formInstitutionName">
                                    <Form.Label>Institution Name</Form.Label>
                                    <Form.Control type="text" name='institutionName' placeholder="Enter institution name" required autoFocus />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formSigle">
                                    <Form.Label>Sigle</Form.Label>
                                    <Form.Control type="text" name='sigle' placeholder="Sigle" required />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formContactPerson">
                                    <Form.Label>Person of contact</Form.Label>
                                    <Form.Control type="text" name='contactPerson' placeholder="Person of contact name" required />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formSelectCountries">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Select aria-label="Default select countries" name='country' value={fieldCountry} onChange={(e) => { setFieldCountry(e.target.value) }}>
                                        <option>Open to select countries</option>
                                        {countries.map((e, key) => {
                                            return <option key={key} value={e.value}>{e.name}</option>;
                                        })}
                                    </Form.Select>
                                </Form.Group>

                                {/* <Form.Group className="mb-3" controlId="my_multiselect_field">
                            <Form.Label>Institution worked with</Form.Label>
                            <Form.Control as="select" multiple value={fields} onChange={e => setFields([].slice.call(e.target.selectedOptions).map(item => item.value))}>
                                {countryData.map((e, key) => {
                                    return <option key={key} value={e.value}>{e.name}</option>;
                                })}
                            </Form.Control>
                        </Form.Group> */}

                                <Form.Group className='my-4'>
                                    <Button variant="primary" className='float-end' type="submit">
                                        Save
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                </Modal.Footer> */}
            </Modal>
        </>
    )
}

export default AddInstitution;