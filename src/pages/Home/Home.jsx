import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Thematic from '../../components/Thematic/Thematic';
import ProjectLists from '../Projects/ProjectLists';
import { Card, Button } from 'react-bootstrap';
//Context
import StateContext from '../../contexts/StateContext';
// import LoadingContext from '../../contexts/LoadingContext';
import AddThematic from '../../components/dialogs/AddThematic';
import MoreDetails from '../../components/MoreDetails/MoreDetails';

function Home() {
    const navigate = useNavigate();
    const GlobalState = useContext(StateContext);
    // const [error, setError] = useState(false);
    // const [loading, setLoading] = useContext(LoadingContext);
    const [visibleThematic, setVisibleThematic] = useState(false);
    const [isThematicUpdated, setIsThematicUpdated] = useState(false);
    // const [thematics, setThematics] = useState([]);

    // useEffect(() => {
    //     // setLoading(true);
    //     let mounted = true;

    //     if (thematics.length && !isThematicUpdated) {
    //         return;
    //     }
    //     // console.log(getThematics().then(data => console.log(data)))
    //     getThematics()
    //         .then(data => {
    //             if (mounted) {
    //                 setThematics(data);
    //                 setIsThematicUpdated(false);
    //             }
    //             // console.log('thematic loaded');
    //         }).catch((err) => {
    //             setError(true);
    //         })
    //         .finally(() => {
    //             // setLoading(false);
    //         });
    //     return () => {
    //         mounted = false;
    //         setIsThematicUpdated(false);
    //     }
    // }, []); //isThematicUpdated, thematics

    const handleAddThematic = (e) => {
        e.preventDefault();
        setVisibleThematic(true);
    }

    const handleAddProject = (e) => {
        e.preventDefault();
        navigate('/manageproject');
    }

    let closeAddThematicDlg = () => setVisibleThematic(false);

    return (
        <main className='container-fluid'>
            {/* {error ? (
                <div
                    className="alert alert-danger alert-dismissible fade show"
                    role="alert">
                    <strong>There was an Error!!</strong> Sorry for the
                    inconvenience. :(
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"></button>
                </div>
            ) : (
                ""
            )} */}

            <div className="grid">
                {/* Thematic */}
                <section className="col-3">
                    {
                        GlobalState.userIsLoggedIn &&
                        <Button variant="success" className='thematic bi-plus-lg' onClick={handleAddThematic}>Add Thematic</Button>
                    }

                    <Card className="text-center shadow-5">
                        <Card.Header as="h5">Thematics</Card.Header>
                        <Card.Body>
                            {/* <Card.Title>Browse thematic</Card.Title> */}
                            <Card.Text>
                                <Thematic isThematicUpdated={isThematicUpdated} />
                            </Card.Text>
                            {/* <Button variant="primary">Go somewhere</Button> */}
                        </Card.Body>
                    </Card>

                    {/* <Card title="Thematic" subTitle="Browse thematic" style={{
                        marginBottom: '2em', marginTop: '1.7em', paddingTop: 0
                    }} className="shadow-5">
                        <Thematic setUpdated={setIsThematicUpdated} />
                    </Card> */}
                </section>

                {/* Project */}
                <div className="col-7">
                    <div className='project'>
                        <h2 style={{ marginTop: 0 }}>Projects / Activities</h2>
                        <>
                            {
                                GlobalState.userIsLoggedIn &&
                                <Button className="bi-plus-lg" variant="success"
                                    onClick={handleAddProject}>Manage Projects</Button>
                            }
                            {/* <span><icon title='Hide details'>i</icon></span> */}
                        </>
                    </div>
                    <ProjectLists />
                </div>

                <section className="col-2 text-center details">
                    <h4 className="text-muted secondary">More details</h4>
                    <MoreDetails />
                </section>
            </div>

            {/* Thematic Dialog */}
            {/* <Dialog header="Thematic" visible={visibleThematic} style={{ width: '50vw' }} onHide={() => setVisibleThematic(false)}>
                <div className="card flex justify-content-center">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column gap-2">
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="thematicTitle" control={control}
                                    rules={{ required: 'Title is required.' }}
                                    render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} value={field.thematicTitle} onChange={(e) => field.onChange(e.target.value)}
                                            autoFocus className={({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                <label htmlFor="thematicTitle" className={({ 'p-error': errors.name })}>Thematic title*</label>
                            </span>
                            {getFormErrorMessage('thematicTitle')}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="sigle" control={control}
                                    render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field}
                                            value={field.sigle} onChange={(e) => field.onChange(e.target.value)}
                                            className={({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                <label htmlFor="sigle" className={({ 'p-error': !!errors.email })}>Thematic shortname</label>
                            </span>
                            {getFormErrorMessage('sigle')}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="description" control={control}
                                    render={({ field, fieldState }) => (
                                        <InputTextarea autoResize id={field.name} {...field}
                                            value={field.description} onChange={(e) => field.onChange(e.target.value)}
                                            rows={5} cols={30} className={({ 'p-invalid': fieldState.invalid })} />
                                        // onChange={(e) => setValue(e.target.value)}
                                    )} />
                                <label htmlFor="description" className={({ 'p-error': !!errors.email })}>Description</label>
                            </span>
                            {getFormErrorMessage('description')}
                        </div>

                        {/* <div className="p-dialog-footer pb-0">
                            <Button label="Submit" type="submit" className="p-button-rounded p-button-success mr-2 mb-2" />
                        </div> */}

            {/* <div className="p-dialog-footer pb-0">
                            <Button label="No" onClick={() => setVisibleThematic(false)} variant="secondary">Cancel</Button>
                            <Button type="submit" variant="primary" className="bi-save" autoFocus>Save</Button>
                        </div>
                    </form> */}
            {/* </div> */}
            {/* </Dialog>} */}

            <AddThematic show={visibleThematic} setupdated={setIsThematicUpdated} onHide={closeAddThematicDlg} />
        </main>
    )
}

export default Home;