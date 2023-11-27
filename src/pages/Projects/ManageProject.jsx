import React, { useState, useEffect, useContext } from 'react';
import { Button, ButtonToolbar, Form, Row, Col, InputGroup, ToggleButton } from 'react-bootstrap';
// import { Controller, useForm } from 'react-hook-form';
import { Panel } from 'primereact/panel';
import { Divider } from 'primereact/divider';
import { getThematics } from '../../services/ThematicService';
import { getInstitutions } from '../../services/InstitutionService';
import { getExecutants } from '../../services/ExecutantService';
import Navigation from '../../components/navigation/Navigation';

// import { moment } from 'moment';
import { sentenceCase } from 'sentence-case';
import { addProject } from '../../services/ProjectService';
import StateContext from '../../contexts/StateContext';
import Toaster from '../../utils/Toaster';

const ManageProject = () => {
    const GlobalState = useContext(StateContext);

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");

    const [institutions, setInstitutions] = useState([]);
    const [executants, setExecutants] = useState([]);
    const [thematics, setThematics] = useState([]);
    const [fieldThematic, setFieldThematic] = useState([]);
    const [fieldInstitutions, setFieldInstitutions] = useState([]);
    const [fieldExecutants, setFieldExecutants] = useState([]);

    const [projectTitle, setProjectTitle] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [locationName, setLocationName] = useState('');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [status, setStatus] = useState(true);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [publish, setPublish] = useState('');
    const [duration, setDuration] = useState(0);
    const [error, setError] = useState("");


    // const defaultValues = {
    //     name: '',
    //     email: '',
    //     password: '',
    //     date: '',
    //     country: '',
    //     accept: false
    // }

    useEffect(() => {
        getThematics().then(data => setThematics(data));
        getInstitutions().then(data => setInstitutions(data));
        getExecutants().then(data => setExecutants(data));
    }, []);

    useEffect(() => {
        const calculateDifference = () => {
            if (!startDate || !endDate) {
                setError("Please enter both dates!");
            } else if (new Date(startDate) > new Date(endDate)) {
                setError("Start Date cannot be greater than End Date!");
            } else {
                const diffTime = Math.abs(new Date(endDate) - new Date(startDate));
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                setDuration(diffDays);
            }
        }
        if (startDate || endDate) {
            calculateDifference();
        };
    }, [startDate, endDate]);

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
        setDuration(0);
        setError("");
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
        setDuration(0);
        setError("");
    };

    // const calculateDifference = () => {
    //     if (!startDate || !endDate) {
    //         setError("Please enter both dates!");
    //     } else if (new Date(startDate) > new Date(endDate)) {
    //         setError("Start Date cannot be greater than End Date!");
    //     } else {
    //         const diffTime = Math.abs(new Date(endDate) - new Date(startDate));
    //         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    //         setDuration(diffDays);
    //     }
    // };

    // const dateConverter = (startDate, timeEnd) => {
    //     const newStartDate = new Date(startDate);
    //     const newEndDate = new Date(timeEnd);
    //     //     let result = moment(newStartDate).diff(newEndDate, 'days')
    //     setDuration(() => moment(newStartDate).diff(newEndDate, 'days'))
    //     //     return result
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        // try {
        //     console.log(fieldThematic);
        //     console.log(fieldInstitutions);
        //     console.log(fieldExecutants);
        //     console.log(e.target.projectTitle.value);
        //     console.log(e.target.projectDescription.value);
        //     console.log(e.target.locationName.value);
        //     console.log(e.target.latitude.value);
        //     console.log(e.target.longitude.value);
        //     console.log(e.target.startDate.value);
        //     console.log(e.target.endDate.value);
        //     console.log(e.target.duration.value);
        //     console.log(e.target.status.value);
        //     console.log(e.target.publish.value);
        // } catch (err) {
        //     console.error("Form Error ==> ", err);
        // }
        const fetchCreate = async () => {
            try {
                const result = await addProject(e.target, fieldInstitutions, fieldExecutants, GlobalState.userToken);

                console.log(result);
                setToastMessage("Project added successfully!");
                setToastType("success");
                // alert(result);
            } catch (error) {
                console.log(error);
                setToastMessage("Something went wrong.");
                setToastType("danger");
                // alert("Failed to Add Project");
            };
            setShowToast(true);
        }
        fetchCreate();
    };

    return (
        <main>

            <Toaster
                title="Project!"
                message={toastMessage}
                showToast={showToast}
                type={toastType}
                onClose={() => setShowToast(false)}
            />

            <Navigation />

            <div className='row'>
                <h2 style={{ marginTop: 0 }} className='project'>Add a new Project</h2>
                <Panel header="Project details">
                    <Form onSubmit={handleSubmit}>

                        <Row>
                            <Col>
                                <InputGroup className="mb-3 alignMidddle">
                                    <InputGroup.Text id="basic-thematic">
                                        <b>Thematic</b>
                                    </InputGroup.Text>
                                    <Form.Select required aria-label="Default select thematic" name='thematic' aria-describedby="basic-thematic" value={fieldThematic} onChange={(e) => { setFieldThematic(e.target.value) }}>
                                        <option disabled>Select thematic</option>
                                        {thematics.map(e => (
                                            <option key={e.id} value={e.value}>{e.thematicTitle}</option>
                                        ))}
                                    </Form.Select>
                                </InputGroup>
                            </Col>
                            <Col>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-institution">
                                        <b>Institution(s)</b>
                                    </InputGroup.Text>
                                    <Form.Control multiple required as="select" aria-label="Default select institution" name='institution' aria-describedby="basic-institution" onChange={e => setFieldInstitutions([].slice.call(e.target.selectedOptions).map(item => item.value))}>
                                        {institutions.map(e => (
                                            <option key={e.id} value={e.value}>
                                                {e.institutionName}
                                            </option>
                                            //value={fieldInstitutions} 
                                        ))}
                                    </Form.Control>
                                </InputGroup>
                            </Col>
                            <Col>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-executant">
                                        <b>Executant(s)</b>
                                    </InputGroup.Text>
                                    <Form.Control multiple required aria-label="Default select executant" aria-describedby="basic-executant" as="select" name="executant" onChange={e => setFieldExecutants([].slice.call(e.target.selectedOptions).map(item => item.value))}>
                                        {executants.map(e => (
                                            <option key={e.user.id} value={e.value}>
                                                {sentenceCase(e.user.username)}
                                            </option>
                                            // value={fieldExecutants} 
                                        ))}
                                    </Form.Control>
                                </InputGroup>
                            </Col>
                        </Row>

                        <Divider type="dashed" />

                        <Row>
                            <Form.Group className="mb-3" controlId="projectTitle">
                                <Form.Label>Project title</Form.Label>
                                <Form.Control type="text" required name='projectTitle' value={projectTitle} onChange={e => setProjectTitle(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="projectDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} name='projectDescription' value={projectDescription} onChange={e => setProjectDescription(e.target.value)} required />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="projectPlaceLocation">
                                <Form.Label>Place location</Form.Label>
                                <Form.Control type="text" required name="locationName" value={locationName} onChange={e => setLocationName(e.target.value)} />
                            </Form.Group>

                            <Col>
                                <Form.Group className="mb-3" controlId="projectLatitude">
                                    <Form.Label>Latitude</Form.Label>
                                    <Form.Control type="text" name="latitude" value={latitude} onChange={e => setLatitude(e.target.value)} />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-3" controlId="projectLongitude">
                                    <Form.Label>Longitude</Form.Label>
                                    <Form.Control type="text" name="longitude" value={longitude} onChange={e => setLongitude(e.target.value)} />
                                </Form.Group>
                            </Col>

                            <Row>
                                <Col>
                                    {error && <p style={{ color: "red" }}>{error}</p>}
                                    <Row>
                                        <Form.Group className="mb-3" controlId="projectStartDate">
                                            <Form.Label>Start date</Form.Label>
                                            <Form.Control type="date" name="startDate" placeholder={"dd-mm-yyyy"}
                                                value={startDate} onChange={handleStartDateChange}
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group className="mb-3" controlId="projectEndDate">
                                            <Form.Label>End date</Form.Label>
                                            <Form.Control type="date" data-date-format="dd/mm/yyyy" name="endDate" value={endDate} onChange={handleEndDateChange} />
                                        </Form.Group>
                                    </Row>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3 alignMidddle" controlId="projectDuration">
                                        <Form.Label>Duration (days)</Form.Label>
                                        <Form.Control type="text" name="duration" value={duration} onChange={e => setDuration(e.target.value)} readOnly />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-3" controlId="status">
                                <Form.Label>Status</Form.Label>
                                <ToggleButton
                                    className="ml-2"
                                    id="toggle-check"
                                    type="checkbox"
                                    variant="outline-primary"
                                    checked={status}
                                    value={status}
                                    name='status'
                                    onChange={(e) => setStatus(e.currentTarget.checked)}
                                >
                                    Active
                                </ToggleButton>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="projectPublishedDate">
                                <Form.Label>Published date</Form.Label>
                                <Form.Control type="date" required name="publish" value={publish} onChange={e => setPublish(e.target.value)} />
                            </Form.Group>
                        </Row>

                        <ButtonToolbar aria-label="Basic example">
                            {<Button className="thematic bi-plus-lg" variant="success" type="submit">Save project
                            </Button>}{' '}
                        </ButtonToolbar>
                    </Form>
                </Panel>
            </div>

        </main>
    )
}

export default ManageProject;