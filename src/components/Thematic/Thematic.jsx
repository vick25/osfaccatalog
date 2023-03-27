import React, { useState, useEffect, useContext } from 'react';
import { ListBox } from 'primereact/listbox';
import { ProgressBar } from 'primereact/progressbar';
// import { Card } from 'primereact/card';
import Axios from "axios";

//Contexts
import StateContext from '../../contexts/StateContext';

// import { UserService } from '../../services/UserService';
// import UseFetch from '../../services/UseFetch';

const Thematic = () => {
    const GlobalState = useContext(StateContext);

    // const data = UseFetch(`http://localhost:8000/api/v1/thematics`);
    const [selectedThematics, setSelectedThematics] = useState(null);
    const [thematics, setThematics] = useState([]);
    const [dataIsLoading, setDataIsLoading] = useState(true);

    useEffect(() => {
        const source = Axios.CancelToken.source();
        async function getAllThematics() {
            try {
                const response = await Axios.get(`http://localhost:8000/api/v1/thematics`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            // 'Authorization': `Token ${GlobalState.userToken}`
                        }
                    },
                    { cancelToken: source.token });
                // console.log(response.data);
                setThematics(response.data);
                setDataIsLoading(false);
            } catch (error) {
                console.log(error.response);
            }
        }
        //Get all thematics
        getAllThematics();
        return () => {
            source.cancel();
        }
    }, []);

    if (dataIsLoading) {
        <ProgressBar mode="indeterminate" />
    }

    const thematicTemplate = (option) => {
        return (
            <div className="thematic-item">
                <div>{option.thematicTitle}</div>
            </div>
        );
    }

    return (
        <div>
            <ListBox value={selectedThematics} options={thematics} onChange={(e) => setSelectedThematics(e.value)} multiple filter optionLabel="thematicTitle"
                itemTemplate={thematicTemplate} listStyle={{ maxHeight: '250px' }} />
        </div>
    )
}

export default Thematic;