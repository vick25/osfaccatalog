import React, { useState, useEffect, useContext } from 'react';
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import { updateExecutant } from '../../services/ExecutantService';
import { getInstitutions } from '../../services/InstitutionService';
import { getUsers } from '../../services/UserService';
//Context
import StateContext from '../../contexts/StateContext';

const UpdateExecutantModal = (props) => {
    // console.log(props.executant);
    const GlobalState = useContext(StateContext);
    const [institutions, setInstitutions] = useState([]);
    const [users, setUsers] = useState([]);
    // const [fieldInstitution, setFieldInstitution] = useState([]);
    // const [fieldUser, setFieldUser] = useState([]);

    useEffect(() => {
        getUsers(GlobalState.userToken).then(data => setUsers(data));
        getInstitutions().then(data => setInstitutions(data));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateExecutant(props.executant.id, e.target, GlobalState.userToken)
            .then((result) => {
                alert(result);
                props.setupdated(true);
            },
                (error) => {
                    alert("Failed to Update Executant");
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
                        Update Executant Information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formSelectExecutants">
                                    <Form.Label>User</Form.Label>
                                    <Form.Select aria-label="Default select users" name='user' defaultValue={props.executant.user} placeholder="">
                                        {users.map(e => (
                                            <option key={e.id} value={e.username}>{e.username}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group controlId="executantEmpNo">
                                    <Form.Label>Employee No</Form.Label>
                                    <Form.Control type="text" name="executantEmpNo" defaultValue={props.executant.executantEmpNo} placeholder="" />
                                </Form.Group>

                                <Form.Group controlId="executantGrade">
                                    <Form.Label>Grade</Form.Label>
                                    <Form.Control type="text" name="executantGrade" defaultValue={props.executant.executantGrade} placeholder="" />
                                </Form.Group>
                                <Form.Group controlId="profession">
                                    <Form.Label>Profession</Form.Label>
                                    <Form.Control type="text" name="profession" required defaultValue={props.executant.profession} placeholder="" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formSelectInstitutions">
                                    <Form.Label>Institution</Form.Label>
                                    <Form.Select aria-label="Default select institutions" name='institution' defaultValue={props.executant.institution}>
                                        {institutions.map(e => (
                                            <option key={e.id} value={e.institutionName}>{e.institutionName}</option>
                                        ))}
                                    </Form.Select>
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


export default UpdateExecutantModal;