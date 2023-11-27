import React, { useState, useEffect, useContext } from 'react';
import { Alert, Form, Button, Table, Modal } from 'react-bootstrap';
import { FaFileUpload } from 'react-icons/fa'
import { getCategories } from '../../services/CategoryService';
import { getProjects } from '../../services/ProjectService';
import axios from 'axios';
import moment from 'moment';
import StateContext from '../../contexts/StateContext';
import LoadingContext from '../../contexts/LoadingContext';
import Toaster from '../../utils/Toaster';

const AddProjectData = (props) => {
    const GlobalState = useContext(StateContext);
    const [loading, setLoading] = useContext(LoadingContext);

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");

    const { setupdated, ...rest } = props;
    const MAX_COUNT = 15;
    const [message, setMessage] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [rows, setRows] = useState([]);
    const [fileLimit, setFileLimit] = useState(false);
    const [category, setCategory] = useState("");
    const [project, setProject] = useState("");
    const [projects, setProjects] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then(data => setCategories(data));
        getProjects().then(data => setProjects(data));
    }, []);

    useEffect(() => {
        // console.log(uploadedFiles);
        if (uploadedFiles.length > 0) {
            const newArray = uploadedFiles.map((file, i) => {
                // console.log(file);
                const fileAttributesObject = {
                    'id': i + 1,
                    'dataTitle': file.name.replace(/\.[^/.]+$/, ""),
                    'dataCode': handleCode(file),
                    'fileDoc': file,
                    'fileName': file.name
                };
                return fileAttributesObject;
            });
            // console.log(newArray);
            setRows([...newArray]);
            // console.log('Rows', rows);
        } else {
            setRows([]);
        }
    }, [uploadedFiles, project, category])

    const handleUploadFiles = files => {
        const uploaded = [...uploadedFiles];
        let limitExceeded = false;
        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
                if (uploaded.length === MAX_COUNT) setFileLimit(true);
                if (uploaded.length > MAX_COUNT) {
                    alert(`You can only add a maximum of ${MAX_COUNT} files`);
                    setFileLimit(false);
                    limitExceeded = true;
                    return true;
                }
            }
        })
        if (!limitExceeded) setUploadedFiles(uploaded);
    }

    const handleCode = (f) => {
        return createDataCode(project, category, f.name);
    };

    function toUpper(value) {
        if (value) {
            return (value.length < 3) ? value.toUpperCase() : value.substring(0, 3).toUpperCase();
        }
        return "";
    }

    function createDataCode(proj, cat, fname) {
        return `${toUpper(proj)}_${toUpper(cat)}_${toUpper(fname)}${moment(new Date()).format('YYMMDD')}`;
    }

    const handleRemove = (f) => {
        setUploadedFiles(uploadedFiles.filter(x => x.name !== f.name));
    };

    const handleFileUploadEvent = (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files);
        handleUploadFiles(chosenFiles);
    }

    const handleNameChange = (e, id) => {
        const newTitle = e.target.value;

        const newData = rows.map((item) => {
            if (item.id === id) {
                // console.log(e.target.value, id);
                return { ...item, dataTitle: newTitle };
            }
            return item;
        });
        // console.log(newData);
        setRows(newData);
    };

    const handleSubmitDataInfo = async (e) => {
        setLoading(true);
        // e.preventDefault();
        console.log('uploading...');

        const formField = new FormData();
        // formField.append("files", rows);
        formField.append('project', project);
        formField.append('category', category);
        rows.forEach(item => {
            if (item.file !== null) {
                formField.append(`datas`, JSON.stringify(item));
                formField.append(`files`, item.fileDoc);
            }
        })
        // for (let i = 0; i < rows.length; i++) {
        //     formField.append(
        //         `file${i}`,
        //         rows[i].file, rows[i].fileTitle
        //     );
        //     formField.append(
        //         `code${i}`,
        //         rows[i].code
        //     );
        // }
        // for (var pair of formField.entries()) {
        //     console.log(pair[0] + ', ' + pair[1]);
        // }

        // const userToken = '872462c2ccbadfcb4da3fc37301b49d7b781bd68';
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/datas/', formField, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${GlobalState.userToken}`
                }
            });
            console.log(response);
            setToastMessage("Project data added successfully!");
            setToastType("success");
            setupdated(true);
        }
        catch (error) {
            console.error(error);
            setToastMessage("Something went wrong.");
            setToastType("danger");
        } finally {
            setLoading(false);
        };

        props.onHide();
        setShowToast(true);
    }

    return (
        <>

            <Toaster
                title="Project Data!"
                message={toastMessage}
                showToast={showToast}
                type={toastType}
                onClose={() => setShowToast(false)}
            />

            <Modal
                {...rest}
                backdrop="static"
                keyboard={false}
                fullscreen={true}
                aria-labelledby="contained-modal-ai-title-vcenter" centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-ai-title-vcenter">Add Data to Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='App'>
                        {/* <Form encType="multipart/form-data"> */}
                        <Form.Group controlId="formProject" className="mb-3">
                            <Form.Label>Project</Form.Label>
                            <Form.Select required aria-label="Default select project" name='project' aria-describedby="basic-project" value={project}
                                onChange={(e) => {
                                    setProject(e.target.value);
                                }}>
                                <option></option>
                                {projects.map(e => (
                                    <option key={e.id} value={e.projectTitle}>{e.projectTitle}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>


                        <Form.Group controlId='formCategory' className='mb-3'>
                            <Form.Label>Category</Form.Label>
                            <Form.Select required aria-label="Default select category" name='category' aria-describedby="basic-category" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option></option>
                                {categories.map(e => (
                                    <option key={e.id} value={e.categoryTitle}>{e.categoryTitle}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <input id='fileUpload' type='file' multiple style={{ display: "none" }}
                            accept='application/pdf,image/*,.doc,.docx'
                            onChange={handleFileUploadEvent}
                            disabled={fileLimit} />

                        <div className='mb-3'>
                            <label htmlFor='fileUpload'>
                                <a className={`btn btn-primary ${!fileLimit ? '' : 'disabled'}`} disabled={project === '' && category === ''} variant="primary">
                                    Add File(s)...
                                </a>
                            </label>
                        </div>

                        {rows.length > 0 &&
                            <div className="uploaded-files-list">
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>File title</th>
                                            <th>Code</th>
                                            <th>File</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows.map((f, i) => {
                                            const { id, dataTitle, dataCode, fileDoc } = f;
                                            return (
                                                <tr key={id}>
                                                    <td>{id}</td>
                                                    <td>
                                                        <Form.Control type="text" name="fileTitle" required defaultValue={dataTitle} onChange={(e) => handleNameChange(e, id)} />
                                                    </td>
                                                    <td>
                                                        {dataCode}
                                                    </td>
                                                    <td>{fileDoc.name}</td>
                                                    <td>
                                                        <Button className="mr-2 bi bi-trash" variant="danger"
                                                            onClick={e => handleRemove(fileDoc)}>
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </div>
                        }
                        <hr />
                        <p style={{ "marginTop": "50px !important" }}>
                            <Button className={`btn btn-success ${rows.length && project && category ? '' : 'disabled'}`} onClick={handleSubmitDataInfo}>
                                <FaFileUpload fontSize="20px" />
                                Upload project data(s)
                            </Button>
                        </p>

                        {/* <Transition in={alert.show}> */}
                        <Alert variant="success" show={message}>
                            {message}
                        </Alert>
                        {/* </Transition> */}
                        {/* </Form> */}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddProjectData;