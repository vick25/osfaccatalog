import React, { useEffect, useState, useContext } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import Navigation from '../../components/navigation/Navigation';
import { getExecutants, deleteExecutant } from '../../services/ExecutantService';
import AddExecutant from '../../components/dialogs/AddExecutant';
import UpdateExecutantModal from '../../components/dialogs/UpdateExecutantModal';
//Context
import StateContext from '../../contexts/StateContext';
import LoadingContext from '../../contexts/LoadingContext';

const ExecutantList = () => {
    const GlobalState = useContext(StateContext);
    const [loading, setLoading] = useContext(LoadingContext);
    const [executants, setExecutants] = useState([]);
    const [visibleExecutant, setVisibleExecutant] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editExecutant, setEditExecutant] = useState([]);
    const [isExecutantUpdated, setIsExecutantUpdated] = useState(false);

    const handleAddExecutant = (e) => {
        e.preventDefault();
        setVisibleExecutant(true);
    }

    const handleUpdate = (e, exec) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditExecutant(exec);
    };

    const fetchExecutants = async () => {
        try {
            const result = await getExecutants();
            setExecutants(result);
            setIsExecutantUpdated(false);
        } catch (err) {
            if (!err.response)
                console.log(`Error: ${err.message}`);

            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
            // setError(true);
        } finally {
            // mounted = false;
            setIsExecutantUpdated(false);
            setLoading(false);
        }
    }
    const handleDelete = (e, executantId) => {
        if (window.confirm('Are you sure to delete this executant ?')) {
            e.preventDefault();
            const deleteExec = async () => {
                try {
                    const result = await deleteExecutant(executantId, GlobalState.userToken);
                    alert(result);
                    setIsExecutantUpdated(true);
                } catch (err) {
                    alert("Failed to Delete Executant");
                } finally {
                    fetchExecutants();
                }
            };
            deleteExec();
        }
    };


    let closeAddExecutantDlg = () => setVisibleExecutant(false);
    let editModalClose = () => setEditModalShow(false);

    useEffect(() => {
        // let mounted = true;

        setLoading(true);

        // if (executants.length && !isExecutantUpdated) {
        //     // console.log(executants.length, !isExecutantUpdated, executants.length == 0 && !isExecutantUpdated);
        //     return;
        // }

        fetchExecutants();
    }, [isExecutantUpdated]);

    return (
        <>
            <Navigation />

            <div className="container-fluid">
                <h2 style={{ marginTop: 0 }} className='project'>Manage executants</h2>
                <div className="row side-row" >
                    <Table responsive striped bordered hover className="react-bootstrap-table" id="dataTable">
                        <thead>
                            <tr>
                                <th>User_ID</th>
                                <th>Employee No</th>
                                <th>Grade</th>
                                <th>Profession</th>
                                <th>Institution</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {executants.map((exec) =>
                                <tr key={exec.user.id}>
                                    <td>{exec.user.username}</td>
                                    <td>{exec.executantEmpNo}</td>
                                    <td>{exec.executantGrade}</td>
                                    <td>{exec.profession}</td>
                                    <td>{exec.institution.sigle}</td>
                                    <td className='buttons-table'>
                                        <Button className="mr-0 bi bi-pen-fill"
                                            onClick={e => handleUpdate(e, exec)}>
                                        </Button>
                                        <Button className="mr-2 bi bi-trash" variant="danger"
                                            onClick={e => handleDelete(e, exec.id)}>
                                        </Button>
                                    </td>
                                </tr>
                            )
                            }
                        </tbody>
                    </Table>
                </div>
            </div>

            <ButtonToolbar aria-label="Basic example">
                {<Button className="thematic bi-plus-lg" variant="success" onClick={handleAddExecutant}>Add Executant
                </Button>}{' '}
            </ButtonToolbar>


            <AddExecutant show={visibleExecutant} setupdated={setIsExecutantUpdated} onHide={closeAddExecutantDlg} />

            <UpdateExecutantModal show={editModalShow} executant={editExecutant} setupdated={setIsExecutantUpdated} onHide={editModalClose} />
        </>
    );
};

export default ExecutantList;