import React, { useRef, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Password } from "primereact/password";
import { Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    const toast = useRef(null);

    const [sendRequest, setSendRequest] = useState(false);
    const [dataValues, setDataValues] = useState({});

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: getValues('username') });
    };

    const defaultValues = {
        username: '',
        email: '',
        password1: "",
        password2: ""
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
        reset
    } = useForm({ defaultValues });

    const onSubmit = (data) => {
        try {
            setDataValues(data);
            setSendRequest(!sendRequest);
            console.log('data submitted', data);

            data.username && show();
        } catch (err) {
            console.error("Form Error ==> ", err);
        }

        reset();
    };

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };

    useEffect(() => {
        if (sendRequest) {
            const source = Axios.CancelToken.source();

            async function signUp() {
                try {
                    const response = await Axios.post(`http://127.0.0.1:8000/api/v1/dj-rest-auth/registration/`, dataValues,
                        { cancelToken: source.token });
                    console.log(response);

                    navigate('/');
                } catch (error) {
                    console.log(error.response);
                }
            }

            signUp();
            return () => {
                source.cancel();
            }
        }
    }, [sendRequest, dataValues]);

    return (
        <div className='card flex justify-content-center formContainer'>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column gap-2">
                <Typography variant="h4" align="center" className='mb-5'>
                    CREATE AN ACCOUNT
                </Typography>

                <Toast ref={toast} />

                <div className="formField">
                    <Controller
                        name="username"
                        control={control}
                        rules={{ required: 'Username is required.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                <span className="p-float-label">
                                    <InputText id="username" inputId={field.name} value={field.username} inputRef={field.ref} {...field} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                    <label htmlFor={field.name}>Username</label>
                                </span>
                                {getFormErrorMessage(field.name)}
                            </>
                        )}
                    />
                </div>

                <div className="formField">
                    <Controller
                        name="email"
                        control={control}
                        rules={{ required: "Email is required." }}
                        render={({ field, fieldState }) => (
                            <>
                                <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                <span className="p-float-label">
                                    <InputText id='email' {...field} type="text" />
                                    <label htmlFor={field.name}>Email</label>
                                </span>
                                {getFormErrorMessage(field.name)}
                            </>
                        )}
                    />
                </div>

                <div className="formField">
                    <Controller
                        name="password1"
                        control={control}
                        rules={{ required: "Password is required." }}
                        render={({ field, fieldState }) => (
                            <>
                                <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                <span className="p-float-label">
                                    <Password {...field} inputRef={field.ref} type="password" />
                                    <label htmlFor={field.name}>Password</label>
                                </span>
                                {getFormErrorMessage(field.name)}
                            </>
                        )}
                    />
                </div>

                <div className="formField">
                    <Controller
                        name="password2"
                        control={control}
                        rules={{ required: "Confirm password is required." }}
                        render={({ field, fieldState }) => (
                            <>
                                <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                <span className="p-float-label">
                                    <Password {...field} inputRef={field.ref} type="password" />
                                    <label htmlFor={field.name}>Confirm password</label>
                                </span>
                                {getFormErrorMessage(field.name)}
                            </>
                        )}
                    />
                </div>

                <Button label="SIGN UP" className="p-button-success mt-2" type="submit" icon="pi pi-check" />
            </form>

            <small id="username-help" style={{ marginTop: "1rem" }}>
                <Typography variant="small" align="center" style={{ float: "right" }}>
                    Already have an account?{" "}
                    <span onClick={() => { navigate('/login') }} style={{ cursor: 'pointer', color: "green" }}>SIGN IN</span>
                </Typography>
            </small>
        </div>
    )
}

export default Register