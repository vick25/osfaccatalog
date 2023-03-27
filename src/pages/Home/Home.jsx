import React, { useEffect, useState, useReducer, useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import Thematic from '../../components/Thematic/Thematic';
import Projects from '../Projects/Projects';

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';

import Axios from 'axios';
//Context
import StateContext from '../../contexts/StateContext';

function Home() {
    const navigate = useNavigate();
    const defaultValues = {
        thematicTitle: '',
        sigle: "",
        description: ''
    };

    const initialValues = {
        sendRequest: 0
    }

    function reducer(state, action) {
        switch (action.type) {
            case 'changeSendRequest':
                return {
                    ...state,
                    sendRequest: state.sendRequest + 1
                }
            default:
                return state;
        }
    }

    const GlobalState = useContext(StateContext);
    const [visibleThematic, setVisibleThematic] = useState(false);
    const [dataValues, setDataValues] = useState({});
    const [state, dispatch] = useReducer(reducer, initialValues);

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm({ defaultValues });

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };

    const onSubmit = (data) => {
        setDataValues(data);

        dispatch({ type: 'changeSendRequest' });

        // console.log(data, 'data is submitted');

        reset();

        setVisibleThematic(false);


    };

    // const footerContent = (
    //     <div>
    //         <Button label="No" icon="pi pi-times" onClick={() => setVisibleThematic(false)} className="p-button-text" />
    //         <Button label="Yes" type="submit" icon="pi pi-check" onClick={() => {
    //             onSubmit();
    //         }} autoFocus />
    //     </div>
    // );
    // let [state, setState] = useState({
    //     loading: false,
    //     thematics: [],
    //     errorMessage: null
    // });

    useEffect(() => {
        if (state.sendRequest) {
            async function addThematic() {
                try {
                    const response = await Axios.post(`http://127.0.0.1:8000/api/v1/thematics/`,
                        JSON.stringify(dataValues),
                        {
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8',
                                'Authorization': `Token ${GlobalState.userToken}`
                            }
                        });
                    console.log(response);
                } catch (error) {
                    console.log(error.response);
                }
            }
            addThematic();
        }
    }, [state.sendRequest]);

    const handleAddThematic = (e) => {
        e.preventDefault();
        setVisibleThematic(true);
    }

    const handleAddProject = (e) => {
        e.preventDefault();
        navigate('/CreateProject');
    }

    return (
        <main>
            <div className="grid">
                {/* Thematic */}
                <div className="col-3">
                    <Button label="Add Thematic" icon="pi pi-plus" className="thematic p-button-success"
                        onClick={handleAddThematic}
                    />
                    <Card title="Thematic" subTitle="Browse thematic" style={{
                        marginBottom: '2em', marginTop: '1.7em', paddingTop: 0
                    }} className="shadow-5">
                        <Thematic />
                    </Card>
                </div>
                {/* Project */}
                <div className="col-7">
                    <div className='project'>
                        <h2 style={{ marginTop: 0 }}>Projects/Activities</h2>
                        <Button label="Add Project" icon="pi pi-plus" className="p-button-success"
                            onClick={handleAddProject}
                        />
                    </div>
                    <Projects />
                </div>
                <div className="col-2">
                    <h3>Recent Activities</h3>
                </div>
            </div>

            {/* Thematic Dialog */}
            <div className="card flex justify-content-center">
                <Dialog header="Thematic" visible={visibleThematic} style={{ width: '50vw' }} onHide={() => setVisibleThematic(false)}>
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

                        <div className="p-dialog-footer pb-0">
                            <Button label="No" icon="pi pi-times" onClick={() => setVisibleThematic(false)} className="p-button-text" />
                            <Button label="Yes" type="submit" className="p-button-success" icon="pi pi-check" autoFocus />
                        </div>
                    </form>
                </Dialog>
            </div>
        </main>
    )
}

export default Home;