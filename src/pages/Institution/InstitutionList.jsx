import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { getInstitutions, deleteInstitution } from '../../services/InstitutionService';
import Navigation from '../../components/navigation/Navigation';
import AddInstitution from '../../components/dialogs/AddInstitution';
import UpdateInstitutionModal from '../../components/dialogs/UpdateInstitutionModal';
//Context
import StateContext from '../../contexts/StateContext';
import LoadingContext from '../../contexts/LoadingContext';

const InstitutionList = () => {
    const GlobalState = useContext(StateContext);
    const [loading, setLoading] = useContext(LoadingContext);
    const [error, setError] = useState(false);
    const [visibleInstitution, setVisibleInstitution] = useState(false);
    const [institutions, setInstitutions] = useState([]);
    const [isInstitutionUpdated, setIsInstitutionUpdated] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editInstitution, setEditInstitution] = useState([]);

    const handleAddInstitution = (e) => {
        e.preventDefault();
        setVisibleInstitution(true);
    }

    const handleUpdate = (e, inst) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditInstitution(inst);
    };

    const fetchInstitutions = async () => {
        let mounted = true;
        try {
            const result = await getInstitutions();
            if (mounted) {
                setInstitutions(result.reverse());
            }
        } catch (err) {
            if (!err.response)
                console.log(`Error: ${err.message}`);

            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
            setError(true);
        } finally {
            mounted = false;
            setIsInstitutionUpdated(false);
            setLoading(false);
        }
    };

    const handleDelete = (e, institutionId) => {
        e.preventDefault();
        if (window.confirm(`Are you sure you want to delete this institution ${institutionId} ?`)) {
            const deleteInst = async () => {
                try {
                    const result = await deleteInstitution(institutionId, GlobalState.userToken);
                    alert(result);
                    setIsInstitutionUpdated(true);
                } catch (err) {
                    alert("Failed to Delete Institution");
                    setError(true);
                } finally {
                    fetchInstitutions();
                    // async () => {
                    //    await getInstitutions()
                    //         .then((res) => setInstitutions(res.data.reverse()))
                    //         .catch((err) => setError(true));
                };
            };
            deleteInst();
        }
    };

    let closeAddInstitutionDlg = () => setVisibleInstitution(false);
    let editModalClose = () => setEditModalShow(false);

    useEffect(() => {
        setLoading(true);

        fetchInstitutions();
    }, [isInstitutionUpdated]);

    return (
        <>
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

                <h2 style={{ marginTop: 0 }} className='project'>Manage institutions</h2>

                <div className="row side-row" >
                    <Table responsive striped bordered hover className="react-bootstrap-table" id="dataTable">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Institution name</th>
                                <th>Sigle</th>
                                <th>Contact person</th>
                                <th>Country</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {institutions.map((inst) =>
                                <tr key={inst.id}>
                                    <td>{inst.id}</td>
                                    <td>{inst.institutionName}</td>
                                    <td>{inst.sigle}</td>
                                    <td>{inst.contactPerson}</td>
                                    <td>{inst.country}</td>
                                    <td className='buttons-table'>
                                        <Button className="bi bi-pen-fill"
                                            onClick={e => handleUpdate(e, inst)}>
                                        </Button>
                                        <Button className="bi bi-trash" variant="danger"
                                            onClick={e => handleDelete(e, inst.id)}>
                                        </Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </div>

            <ButtonToolbar aria-label="Basic example">
                {<Button className="thematic bi-plus-lg" variant="success" onClick={handleAddInstitution}>Add Institution
                </Button>}{' '}
            </ButtonToolbar>

            <AddInstitution show={visibleInstitution} setupdated={setIsInstitutionUpdated} onHide={closeAddInstitutionDlg} />

            <UpdateInstitutionModal show={editModalShow} institution={editInstitution} setupdated={setIsInstitutionUpdated} onHide={editModalClose} />
        </>
    )
}

export default InstitutionList;