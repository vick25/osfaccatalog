import React, { useState, useEffect, useContext } from 'react';
import {
    Form,
    FormGroup,
    Image,
    Button,
    ToggleButton,
    Dropdown,
    Modal
} from "react-bootstrap";
//Context
import StateContext from '../../contexts/StateContext';

const AddProjectData = (props) => {
    const GlobalState = useContext(StateContext);
    const { setupdated, ...rest } = props;

    const [title, setTitle] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [description, setDescription] = useState("");
    const [code, setCode] = useState("");
    const [exist, setExist] = useState(false);
    const [status, setStatus] = useState(true);
    const [categories, setCategories] = useState(["Category 1", "Category 2", "Category 3"]);
    const [projects, setProjects] = useState(["Project 1", "Project 2", "Project 3"]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(title, thumbnail, description, code, exist, status, categories, projects);
        // addInstitution(e.target, GlobalState.userToken)
        //     .then((result) => {
        //         alert(result);
        //         props.setupdated(true);
        //     },
        //         (error) => {
        //             alert("Failed to Add Institution");
        //         })
        props.onHide();
    }

    return (
        <>
            <Modal
                {...rest}
                backdrop="static"
                keyboard={false}
                fullscreen={true}
                aria-labelledby="contained-modal-ai-title-vcenter" centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-ai-title-vcenter">Add Institution</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formInstitutionName">
                            <Form.Label>Institution Name</Form.Label>
                            <Form.Control type="text" name='institutionName' placeholder="Enter institution name" required />
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
                            {/* <Form.Select aria-label="Default select countries" name='country' value={fieldCountry} onChange={(e) => { setFieldCountry(e.target.value) }}>
                                <option>Open to select countries</option>
                                {countries.map((e, key) => {
                                    return <option key={key} value={e.value}>{e.name}</option>;
                                })}
                            </Form.Select> */}
                        </Form.Group>

                        {/* <Form.Group className="mb-3" controlId="my_multiselect_field">
                            <Form.Label>Institution worked with</Form.Label>
                            <Form.Control as="select" multiple value={fields} onChange={e => setFields([].slice.call(e.target.selectedOptions).map(item => item.value))}>
                                {countryData.map((e, key) => {
                                    return <option key={key} value={e.value}>{e.name}</option>;
                                })}
                            </Form.Control>
                        </Form.Group> */}

                        <FormGroup>
                            <Form.Label htmlFor="title">Title</Form.Label>
                            <Form.Control
                                type="text"
                                id="title"
                                placeholder="Enter title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormGroup>
                        <Form.Group className="mb-3">
                            <Form.Label>Main file</Form.Label>
                            <Form.Control type="file" />
                        </Form.Group>
                        <FormGroup>
                            <Form.Label htmlFor="thumbnail">Thumbnail</Form.Label>
                            <Form.Control
                                id="thumbnail"
                                type="file"
                                accept="image/png, image/jpeg"
                                onLoad={(e) => setThumbnail(e.target.files[0])}
                            />
                            <Image src={thumbnail} alt="Thumbnail Preview" />
                        </FormGroup>
                        <FormGroup>
                            <Form.Label htmlFor="description">Description</Form.Label>
                            <Form.Control
                                type="text"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Form.Label htmlFor="code">Code</Form.Label>
                            <Form.Control
                                type="text"
                                id="code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Form.Label htmlFor="exist">Exist</Form.Label>
                            <ToggleButton id="exist" checked={exist} onChange={setExist} />
                        </FormGroup>
                        <FormGroup>
                            <Form.Label htmlFor="status">Status</Form.Label>
                            <ToggleButton id="status" checked={status} onChange={setStatus} />
                        </FormGroup>
                        <FormGroup>
                            <Form.Label htmlFor="categories">Categories</Form.Label>
                            <Dropdown
                                id="categories"
                                value={categories}
                                onChange={(e) => setCategories(e.target.value)}
                                options={categories}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Form.Label htmlFor="projects">Projects</Form.Label>
                            <Dropdown
                                id="projects"
                                value={projects}
                                onChange={(e) => setProjects(e.target.value)}
                                options={projects}
                            />
                        </FormGroup>

                        <Button variant="primary" type="submit">
                            Upload data(s)
                        </Button>
                    </Form>
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

export default AddProjectData;