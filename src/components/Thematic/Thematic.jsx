import React, { useState, useEffect, useContext } from 'react';
import { ListBox } from 'primereact/listbox';
import { getThematics } from '../../services/ThematicService';
import DispatchContext from '../../contexts/DispatchContext';

const Thematic = (props) => {
    const GlobalDispatch = useContext(DispatchContext);
    const [selectedThematics, setSelectedThematics] = useState([]);
    const [thematics, setThematics] = useState([]);
    const { isThematicUpdated } = props;

    useEffect(() => {
        let mounted = true;

        const fetchThematics = async () => {
            try {
                const result = await getThematics();
                if (mounted) {
                    setThematics(result);
                }
            } catch (err) {
                if (!err.response)
                    console.log(`Error: ${err.message}`);

                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            } finally {
                mounted = false;
            }
        }

        fetchThematics();
    }, [isThematicUpdated]);

    useEffect(() => {
        if (selectedThematics.length > 0) {
            GlobalDispatch({
                type: 'THEMATIC_PROJECTS',
                selectedThematics: selectedThematics,
                isSelectedThematics: true
            });
        } else {
            GlobalDispatch({
                type: 'NO_THEMATIC_PROJECTS'
            });
        }
    }, [selectedThematics])

    const thematicTemplate = (option) => {
        return (
            <div className="thematic-item">
                <div>
                    {option.thematicTitle}&nbsp;
                    <span title={`${option.projects} project(s) available`}>({option.projects})</span>
                </div>
            </div>
        );
    }

    return (
        <>
            <ListBox value={selectedThematics} options={thematics} onChange={(e) => setSelectedThematics(e.value)} multiple filter optionLabel="thematicTitle" itemTemplate={thematicTemplate} listStyle={{ maxHeight: '250px' }} />
        </>
    )
}

export default Thematic;