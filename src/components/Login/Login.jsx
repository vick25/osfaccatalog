import React, { useRef, useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Password } from "primereact/password";
import { Typography } from '@mui/material';

import Axios from 'axios';

//Contexts
import DispatchContext from '../../contexts/DispatchContext';

const Login = () => {
    const GlobalDispatch = useContext(DispatchContext);

    const navigate = useNavigate();
    const toast = useRef(null);


    const [sendRequest, setSendRequest] = useState(false);
    const [dataValues, setDataValues] = useState({});
    const [tokenValue, setTokenValue] = useState('');

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: getValues('username') });
    };

    // const initialState = {
    //     username: '',
    //     password: '',
    //     sendRequest: 0,
    //     token: ''
    // };

    // const reducer = (state, action) => {
    //     switch (action.type) {
    //         case "usernameChange":
    //             state.username = action.username;
    //             break;
    //         case "passwordChange":
    //             state.password = action.password;
    //             break;
    //         case "sendRequestChange":
    //             state.sendRequest = state.sendRequest + 1;
    //             break;
    //         case "catchToken":
    //             state.token = action.tokenValue;
    //             break;
    //     }
    // };

    // const [state, dispatch] = useReducer(reducer, initialState);

    const defaultValues = {
        username: '',
        password: ""
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
        reset
    } = useForm({ defaultValues });

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };

    const onSubmit = (data) => {
        // dispatch({ type: 'sendRequestChange' });
        setDataValues(data);
        setSendRequest(!sendRequest);

        data.value && show();
        console.log('data is submitted');

        reset();
    };

    //Get user info
    useEffect(() => {
        if (tokenValue !== "") {
            const source = Axios.CancelToken.source();

            async function getUserInfo() {
                try {
                    const response = await Axios.get(`http://127.0.0.1:8000/api/v1/dj-rest-auth/user/`,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Token '.concat(tokenValue)
                            }
                        },
                        { cancelToken: source.token });
                    console.log('User infos:', response);

                    GlobalDispatch({
                        type: 'USER_SIGNS_IN',
                        usernameInfo: response.data.username,
                        emailInfo: response.data.email,
                        IdInfo: response.data.pk,
                    });

                    navigate('/');
                } catch (error) {
                    console.log(error.response);
                }
            }

            getUserInfo();
            return () => {
                source.cancel();
            }
        }
    }, [tokenValue]);

    //sign In
    useEffect(() => {
        if (sendRequest) {
            const source = Axios.CancelToken.source();

            async function signIn() {
                try {
                    const response = await Axios.post(`http://127.0.0.1:8000/api/v1/dj-rest-auth/login/`, dataValues,
                        { cancelToken: source.token });

                    console.log(response);
                    setTokenValue(response.data.key);

                    GlobalDispatch({
                        type: 'CATCH_TOKEN',
                        userTokenValue: response.data.key
                    });
                } catch (error) {
                    console.log(error.response);
                }
            }

            signIn();
            return () => {
                source.cancel();
            }
        }
    }, [sendRequest, dataValues]);


    return (
        <div className='card flex justify-content-center formContainer'>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column gap-2">
                <Typography variant="h4" align="center" className='mb-5'>
                    SIGN IN
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
                                    <InputText id="username" inputId={field.name} value={field.username} inputRef={field.ref} className={classNames({ 'p-invalid': fieldState.error })}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        {...field} />
                                    <label htmlFor={field.name}>Username</label>
                                </span>
                                {getFormErrorMessage(field.name)}
                            </>
                        )}
                    />
                </div>

                <div className="formField">
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: "Password is required." }}
                        render={({ field, fieldState }) => (
                            <>
                                <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                <span className="p-float-label">
                                    <Password {...field} inputRef={field.ref} type="password" value={field.password} {...field}
                                        // onChange={(e) => field.onChange(e.target.value)}
                                        feedback={false} toggleMask />
                                    <label htmlFor={field.name}>Password</label>
                                </span>
                                {getFormErrorMessage(field.name)}
                            </>
                        )}
                    />
                </div>

                <Button label="SIGN IN" className="p-button-success mt-2" type="submit" icon="pi pi-check" />
            </form>

            <small id="username-help" style={{ marginTop: "1rem" }}>
                <Typography variant="small" align="center" style={{ float: "right" }}>
                    Don't have an account yet? {" "} <span onClick={() => { navigate('/register') }} style={{ cursor: 'pointer', color: "green" }}>SIGN UP</span>
                </Typography>
            </small>
        </div>
    )
}

export default Login 