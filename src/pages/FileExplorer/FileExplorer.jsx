import React, { useState, useEffect, useContext } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import AddProjectData from '../../components/dialogs/AddProjectData';
import { getDatas } from '../../services/DataService';
import SingleFile from './SingleFile';
import FilterData from './FilterData';
import './FileStyle.css';

import StateContext from '../../contexts/StateContext';
import LoadingContext from '../../contexts/LoadingContext';

const FileExplorer = () => {
    const GlobalState = useContext(StateContext);
    const [loading, setLoading] = useContext(LoadingContext);
    const [visibleProjectData, setVisibleProjectData] = useState(false);
    const [datas, setDatas] = useState([]);
    const [isProjectDataUpdated, setIsProjectDataUpdated] = useState(false);

    const handleAddProjectData = (e) => {
        e.preventDefault();
        setVisibleProjectData(true);
    }

    let closeAddProjectDataDlg = () => setVisibleProjectData(false);

    useEffect(() => {
        setLoading(true);

        const getAllDatas = async () => {
            let mounted = true;
            try {
                const result = await getDatas();
                if (mounted) {
                    setDatas(result);
                    setIsProjectDataUpdated(false);
                }
            } catch (err) {
                if (!err.response)
                    console.log(`Error: ${err.message}`);

                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            } finally {
                setLoading(false);
                mounted = false;
                setIsProjectDataUpdated(false);
            }
        };

        getAllDatas();
    }, [isProjectDataUpdated]);

    const transformData = () => {
        let sortedData = [...datas];

        if (!GlobalState.sort) {
            return datas;
        }

        sortedData = sortedData.sort((a, b) =>
            GlobalState.sort === "lowToHigh" ? a.dataTitle.localeCompare(b.dataTitle) : b.dataTitle.localeCompare(a.dataTitle)
        );
        return sortedData;
    };

    const allDatas = transformData().map((data) => (
        <SingleFile data={data} key={data.id} />
    ));

    return (
        <>
            {
                GlobalState.userIsLoggedIn &&
                <>
                    <div>
                        <ButtonToolbar aria-label="Basic example">
                            {<Button className="thematic bi-plus-lg" variant="success" onClick={handleAddProjectData}>Add data to a project
                            </Button>}{' '}
                        </ButtonToolbar>
                    </div>
                    <hr />
                </>
            }
            <div className='home'>
                <FilterData />

                <div className="dataContainer">
                    <h6>{transformData().length} {`${transformData().length === 1 ? `file` : `files`}`} displayed.</h6>
                    <div className='data'>
                        {allDatas}
                    </div>
                </div>

                <AddProjectData show={visibleProjectData} setupdated={setIsProjectDataUpdated} onHide={closeAddProjectDataDlg} />
            </div>
        </>
    )
}

export default FileExplorer;