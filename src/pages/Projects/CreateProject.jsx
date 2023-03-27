import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Panel } from 'primereact/panel';
import { Divider } from 'primereact/divider';
import { AutoComplete } from "primereact/autocomplete";
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';

import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { classNames } from 'primereact/utils';
import { CountryService } from '../../components/test/CountryService';



const CreateProject = () => {
    const [countries, setCountries] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const countryservice = new CountryService();

    const defaultValues = {
        name: '',
        email: '',
        password: '',
        date: null,
        country: null,
        accept: false
    }

    useEffect(() => {
        let datas = countryservice.getCountries();
        setCountries(datas)
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const [value, setValue] = useState('');
    const [items, setItems] = useState([]);

    const search = (event) => {
        let _items = [...Array(10).keys()];
        setItems(event.query ? [...Array(10).keys()].map(item => event.query + '-' + item) : _items);
    }

    const handleAddThematic = (e) => {
        e.preventDefault();
    }

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
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

        } catch (err) {
            console.error("Form Error ==> ", err);
        }

        reset();
    };

    return (
        <div>
            <h1>Add a new Project</h1>
            <Panel header="Project details">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="card flex justify-content-center">
                        <div className="flex flex-column ">
                            <div className="flex justify-content-center align-items-center gap-3">
                                Thematic
                                <AutoComplete value={value} suggestions={items} completeMethod={search} onChange={(e) => setValue(e.value)} dropdown />
                                <Button icon="pi pi-plus" className="p-button-success" badge="8" tooltip="Add a new thematic" tooltipOptions={{ position: 'top' }}
                                    onClick={handleAddThematic}
                                />
                            </div>
                            {/* <div className="card flex justify-content-center align-items-center gap-3">
                            Category
                            <AutoComplete value={value} suggestions={items} completeMethod={search} onChange={(e) => setValue(e.value)} dropdown />
                            <Button icon="pi pi-plus" badge="8" className="p-button-success" tooltip="Add a new category" tooltipOptions={{ position: 'top' }} />
                        </div> */}
                        </div>
                        <Divider layout="vertical" />
                        <div className="flex flex-column">
                            <div className="card flex justify-content-center align-items-center gap-3">
                                Institution
                                <AutoComplete value={value} suggestions={items} completeMethod={search} onChange={(e) => setValue(e.value)} dropdown />
                                <Button icon="pi pi-plus" badge="8" className="p-button-success" tooltip="Add a new institution" tooltipOptions={{ position: 'top' }} />
                            </div>

                            <div className="card flex justify-content-center align-items-center gap-3">
                                Executant
                                <AutoComplete value={value} suggestions={items} completeMethod={search} onChange={(e) => setValue(e.value)} dropdown />
                                <Button icon="pi pi-plus" badge="8" className="p-button-success" tooltip="Add a new executant" tooltipOptions={{ position: 'top' }} />
                            </div>
                        </div>
                    </div>

                    <Divider type="dashed" />

                    <div className="form-demo">
                        <div className="card flex justify-content-center">

                            <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                                <div className="field">
                                    <span className="p-float-label">
                                        <Controller name="name" control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
                                            <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                        )} />
                                        <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Project title*</label>
                                    </span>
                                    {getFormErrorMessage('name')}
                                </div>

                                <div className="field">
                                    <span className="p-float-label">
                                        <Controller name="name" control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
                                            <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                        )} />
                                        <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Place location*</label>
                                    </span>
                                    {getFormErrorMessage('name')}
                                </div>

                                <div className="field">
                                    <span className="p-float-label">
                                        <Controller name="name" control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
                                            <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                        )} />
                                        <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Latitude*</label>
                                    </span>
                                    {getFormErrorMessage('name')}
                                </div>

                                <div className="field">
                                    <span className="p-float-label">
                                        <Controller name="name" control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
                                            <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                        )} />
                                        <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Longitude*</label>
                                    </span>
                                    {getFormErrorMessage('name')}
                                </div>

                                <div className="field">
                                    <span className="p-float-label">
                                        <Controller name="name" control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
                                            <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                        )} />
                                        <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Publish date*</label>
                                    </span>
                                    {getFormErrorMessage('name')}
                                </div>

                                <div className="field">
                                    <span className="p-float-label">
                                        <Controller name="name" control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
                                            <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                        )} />
                                        <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Longitude*</label>
                                    </span>
                                    {getFormErrorMessage('name')}
                                </div>

                                <div className="field">
                                    <span className="p-float-label">
                                        <Controller name="date" control={control} render={({ field }) => (
                                            <Calendar id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon />
                                        )} />
                                        <label htmlFor="date">Start date</label>
                                    </span>
                                </div>

                                <div className="field">
                                    <span className="p-float-label">
                                        <Controller name="date" control={control} render={({ field }) => (
                                            <Calendar id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon />
                                        )} />
                                        <label htmlFor="date">End date</label>
                                    </span>
                                </div>

                                <div className="field">
                                    <span className="p-float-label">
                                        <Controller name="name" control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
                                            <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                        )} />
                                        <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Duration*</label>
                                    </span>
                                    {getFormErrorMessage('name')}
                                </div>

                                <div className="field">
                                    <span className="p-float-label">
                                        <Controller name="country" control={control} render={({ field }) => (
                                            <Dropdown id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} options={countries} optionLabel="name" />
                                        )} />
                                        <label htmlFor="country">Country</label>
                                    </span>
                                </div>


                                <div className="field-checkbox">
                                    <Controller name="accept" control={control} rules={{ required: true }} render={({ field, fieldState }) => (
                                        <Checkbox inputId={field.name} onChange={(e) => field.onChange(e.checked)} checked={field.value} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="accept" className={classNames({ 'p-error': errors.accept })}>I agree to the terms and conditions*</label>
                                </div>

                                <Button type="submit" label="Submit" className="mt-2" />
                            </form>
                        </div>
                    </div>
                </form>
            </Panel>
        </div>
    )
}

export default CreateProject;