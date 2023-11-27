import React, { useEffect, useContext, useState } from 'react';
import StateContext from '../../contexts/StateContext';
import { useLocation } from 'react-router-dom';
import { getDatas } from '../../services/DataService';
import './style.css';

const ProjectDetail = () => {
    const GlobalState = useContext(StateContext);
    const location = useLocation();
    const { projectTitle, thematic, projectDescription, updated,
        locationName, executant, institution, projectDatas } = GlobalState.projectMoreDetails;
    const [datas, setDatas] = useState([]);

    // console.log(GlobalState.projectMoreDetails);

    useEffect(() => {
        const fetchDataFiles = async () => {
            try {
                const result = await getDatas();
                setDatas(result.filter(datas => datas.projectTitle === projectTitle));
            } catch (err) {
                if (!err.response)
                    console.log(`Error: ${err.message}`);

                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            }
        };

        fetchDataFiles();
    }, [projectTitle]); //datas


    return (
        <>
            <small className="path">{location.pathname}</small>

            <main className="container flex flex-column align-items-start">
                <section className='container flex justify-content-between flex-wrap'>
                    <div className='my-2'>
                        <div>
                            <small>
                                Project title
                            </small>
                            <h4>{projectTitle.toUpperCase()}</h4>
                        </div>
                        <div>
                            <small>
                                Localisation
                            </small>
                            <h4>{locationName}</h4>
                        </div>
                        <div>
                            <small>
                                Publish date
                            </small>
                            <h4>{updated}</h4>
                        </div>
                    </div>
                    <div className='my-2'>
                        <small>Thematic</small>
                        <h4>{thematic.thematicTitle}</h4>
                    </div>
                </section>

                <section className="container d-flex flex-column my-2">
                    <small><u>Project files</u> [<span className='danger'>{projectDatas}</span>]</small>
                    <h5 className="mt-3">
                        {datas.length > 0 ?
                            <ol className="list-group list-group-numbered">
                                {datas.map((data, i) => {
                                    return (
                                        <li className="list-group-item" key={i}>
                                            <a href={data.fileDoc} target='_blank' rel='noreferrer'>
                                                {`${data.dataTitle}`}
                                            </a>
                                        </li>
                                    )
                                })}
                            </ol> :
                            "[NO FILE UPLOADED YET !!!]"
                        }
                    </h5>
                </section>

                <section className="container d-flex flex-column my-2">
                    <small><u>Description</u></small>

                    <h5>
                        {projectDescription !== "" || undefined
                            ? projectDescription
                            : "[DESCRIPTION NOT GIVEN]"}
                    </h5>
                </section>

                <section className="container d-flex flex-column my-2">
                    <small><u>Institution(s)</u></small>
                    <h5 className="mt-3">
                        <ol className="list-group list-group-numbered">
                            {institution.map((inst, i) => {
                                return (
                                    <li className="list-group-item" key={i}>
                                        {`${inst.institutionName} (${inst.sigle})`}
                                    </li>
                                )
                            })}
                        </ol>
                    </h5>
                </section>
                <section className="container d-flex flex-column my-2">
                    <small><u>Executed by :</u></small>
                    <h5 className="mt-3">
                        <ol className="list-group list-group-numbered">
                            {executant.map((exec, i) => {
                                return (
                                    <li className="list-group-item" key={i}>
                                        {exec.user.username}
                                    </li>
                                )
                            })}
                        </ol>
                    </h5>
                </section>
            </main>
        </>
    )
}

export default ProjectDetail;