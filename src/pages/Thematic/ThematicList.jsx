import React, { useEffect, useState, useContext } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import Navigation from '../../components/navigation/Navigation';
import { getThematics, deleteThematic } from '../../services/ThematicService';
import AddThematic from '../../components/dialogs/AddThematic';
import UpdateThematicModal from '../../components/dialogs/UpdateThematicModal';
//Context
import StateContext from '../../contexts/StateContext';
import LoadingContext from '../../contexts/LoadingContext';
import Toaster from '../../utils/Toaster';

const ThematicList = () => {
    const GlobalState = useContext(StateContext);
    const [loading, setLoading] = useContext(LoadingContext);
    const [error, setError] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");

    const [thematics, setThematics] = useState([]);
    const [visibleThematic, setVisibleThematic] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editThematic, setEditThematic] = useState([]);
    const [isThematicUpdated, setIsThematicUpdated] = useState(false);

    const handleAddThematic = (e) => {
        e.preventDefault();
        setVisibleThematic(true);
    }

    const handleUpdate = (e, cat) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditThematic(cat);
    };

    const getAllThematics = async () => {
        const result = await getThematics();
        try {
            // if (mounted) {
            setThematics(result);
            setIsThematicUpdated(false);
            // }
        } catch (err) {
            if (!err.response)
                console.log(`Error: ${err.message}`);

            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
            setError(true);
        } finally {
            // mounted = false;
            setIsThematicUpdated(false);
            setLoading(false);
        }
    };

    const handleDelete = (e, thematicId) => {
        e.preventDefault();
        if (window.confirm('Are you sure you want to delete this thematic ?')) {
            const deleteThem = async () => {
                const result = await deleteThematic(thematicId, GlobalState.userToken);
                try {
                    alert(result);
                    setToastMessage("Thematic deleted successfully 🚀!");
                    setToastType("success");
                    setIsThematicUpdated(true);
                } catch (error) {
                    // alert("Failed to Delete Thematic");
                    setToastMessage("Something went wrong.");
                    setToastType("danger");
                } finally {
                    getAllThematics();
                };
            };

            deleteThem();
        }
    };

    let closeAddThematicDlg = () => setVisibleThematic(false);
    let editModalClose = () => setEditModalShow(false);

    useEffect(() => {
        setLoading(true);
        //     let mounted = true;

        //     if (thematics.length && !isThematicUpdated) {
        //         return;
        //     }
        getAllThematics();
    }, [isThematicUpdated]);//isThematicUpdated, thematics

    return (
        <>
            <Toaster
                title="Thematic!"
                message={toastMessage}
                showToast={showToast}
                type={toastType}
                onClose={() => setShowToast(false)}
            />
            <Navigation />
            <div className="container-fluid">
                {error ? (
                    <div
                        className="alert alert-danger alert-dismissible fade show"
                        role="alert">
                        <strong>There was an Error!!</strong> {`Sorry for the
                        inconvenience. :(`}
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="alert"
                            aria-label="Close"></button>
                    </div>
                ) : (
                    ""
                )}

                <h2 style={{ marginTop: 0 }} className='project'>Manage thematics</h2>
                <div className="row side-row" >
                    <Table responsive striped bordered hover className="react-bootstrap-table" id="dataTable">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Thematic title</th>
                                <th>Sigle</th>
                                <th>Description</th>
                                <th>Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {thematics.map((them) =>
                                <tr key={them.id}>
                                    <td>{them.id}</td>
                                    <td>{them.thematicTitle}</td>
                                    <td>{them.sigle}</td>
                                    <td>{them.description}</td>
                                    <td>{them.created}</td>
                                    <td className='buttons-table'>
                                        <button type='button' className='btn btn-light mr-1'
                                            onClick={e => handleUpdate(e, them)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg>
                                        </button>
                                        <button type='button' className='btn btn-light'
                                            onClick={e => handleDelete(e, them.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                            </svg>
                                        </button>


                                        {/* <Button className="mr-1 bi bi-pen-fill"
                                            >
                                        </Button>
                                        <Button className="mr-2 bi bi-trash" variant="danger"
                                            >
                                        </Button> */}
                                        <span>&nbsp;&nbsp;&nbsp;</span>
                                    </td>
                                </tr>
                            )
                            }
                        </tbody>
                    </Table>
                </div>
            </div>

            <ButtonToolbar aria-label="Basic example">
                {<Button className="thematic bi-plus-lg" variant="success" onClick={handleAddThematic}>Add Thematic
                </Button>}{' '}
            </ButtonToolbar>


            <AddThematic show={visibleThematic} setupdated={setIsThematicUpdated} onHide={closeAddThematicDlg} />

            <UpdateThematicModal show={editModalShow} thematic={editThematic} setupdated={setIsThematicUpdated} onHide={editModalClose} />
        </>
    );
};

export default ThematicList;