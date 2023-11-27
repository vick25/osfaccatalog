import React, { useState, useEffect, useContext } from 'react';
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import { addExecutant } from '../../services/ExecutantService';
import { getInstitutions } from '../../services/InstitutionService';
import { getUsers } from '../../services/UserService';
// import AddInstitution from './AddInstitution';
//Context
import StateContext from '../../contexts/StateContext';

const AddExecutantModal = (props) => {
    const GlobalState = useContext(StateContext);
    const [visibleInstitution, setVisibleInstitution] = useState(false);
    const [isInstitutionUpdated, setIsInstitutionUpdated] = useState(false);
    const [institutions, setInstitutions] = useState([]);
    const [users, setUsers] = useState([]);
    const [fieldInstitution, setFieldInstitution] = useState([]);
    const [fieldUser, setFieldUser] = useState([]);

    useEffect(() => {
        getUsers(GlobalState.userToken).then(data => setUsers(data));
        getInstitutions().then(data => setInstitutions(data));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.user.value);
        console.log(e.target.executantEmpNo.value);
        console.log(e.target.executantGrade.value);
        console.log(e.target.profession.value);
        console.log(e.target.institution.value);

        const fetchCreate = async () => {
            try {
                const result = await addExecutant(e.target, GlobalState.userToken);
                alert(result);
                props.setupdated(true);
            } catch (error) {
                alert("Failed to Add Executant");
            }
            props.onHide();
        };

        fetchCreate();
    }


    const handleAddInstitutition = (e) => {
        e.preventDefault();
        console.log('Add institition');
        setVisibleInstitution(true);
    }

    let closeAddInstitutionDlg = () => setVisibleInstitution(false);

    return (
        <div className="container">
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Fill In Executant Information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formSelectUsers">
                            <Form.Label>User</Form.Label>
                            <Form.Select aria-label="Default select users" name='user' value={fieldUser} onChange={(e) => { setFieldUser(e.target.value) }}>
                                <option>Open to select users</option>
                                {users.map((e, key) => (
                                    <option key={key} value={e.value}>{e.username}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor='executantEmpNo'>Employee No</Form.Label>
                            <Form.Control id='executantEmpNo' type="text" name="executantEmpNo"
                                placeholder="" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="executantGrade">
                            <Form.Label>Grade</Form.Label>
                            <Form.Control type="text" name="executantGrade" placeholder="" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="profession">
                            <Form.Label>Profession</Form.Label>
                            <Form.Control type="text" name="profession" required placeholder="" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formSelectInstitutions">
                            <Row>
                                <Col>
                                    <Form.Label>Institution</Form.Label>
                                    <Form.Select aria-label="Default select institutions" name="institution" value={fieldInstitution} onChange={(e) => { setFieldInstitution(e.target.value) }}>
                                        <option>Open to select institutions</option>
                                        {institutions.map(e => (
                                            <option key={e.id} value={e.value}>{e.institutionName}</option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                {/* <Col>
                                            <Button className="ml-2 bi bi-plus" variant="info"
                                                onClick={handleAddInstitutition}>
                                                Add Institution
                                            </Button>
                                        </Col> */}
                            </Row>
                        </Form.Group>

                        <Form.Group>
                            {/* disabled={!executantEmpNo} */}
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" type="submit" onClick={props.onHide}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


            {/* <AddInstitution show={visibleInstitution} setupdated={setIsInstitutionUpdated} onHide={closeAddInstitutionDlg} /> */}
        </div>
    );
};

export default AddExecutantModal;