import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Card } from 'primereact/card';
// import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';
import { getProjects } from '../../services/ProjectService';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import { CgDetailsMore } from 'react-icons/cg';

//Contexts
import DispatchContext from '../../contexts/DispatchContext';
import StateContext from '../../contexts/StateContext';
import LoadingContext from '../../contexts/LoadingContext';


const ProjectLists = () => {
    const GlobalState = useContext(StateContext);
    const GlobalDispatch = useContext(DispatchContext);
    const [loading, setLoading] = useContext(LoadingContext);

    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [isProjectUpdated, setIsProjectUpdated] = useState(false);
    const [selectedCard, setSelectedCard] = useState(0);

    const handleCardClick = (e, projectItem, index) => {
        e.preventDefault();
        setSelectedCard(index);

        GlobalDispatch({
            type: 'PROJECT_MORE_DETAILS',
            projectMoreDetails: projectItem
        });
    };

    // console.log(loading)

    useEffect(() => {
        setLoading(true);

        const fetchProjects = async () => {
            let mounted = true;
            try {
                const result = await getProjects();
                if (mounted) {
                    setProjects(result);
                    setIsProjectUpdated(false);
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
                setIsProjectUpdated(false);
            };
        };

        fetchProjects();
    }, [isProjectUpdated]); //projects

    const transformData = () => {
        let sortedProjects = [...projects];

        if (!GlobalState.isSelectedThematics) {
            return projects;
        }

        sortedProjects = sortedProjects.filter(x => GlobalState.selectedThematics.map(x => x.id).includes(x.thematic.id));

        return sortedProjects;
    };

    function convertDates(dateString) {
        return moment(dateString).format('YYYY-MM-DD');
    }

    // const projectThematicList = [
    //     { "projectTitle": "Etude sur la dynamique des feux de brousse", "channelName": "Qaifi Khan", "subscribers": "20k" },
    //     { "projectTitle": "Etude des tourbieres dans la Province de la Mongala", "channelName": "John Doe", "subscribers": "7k" },
    //     { "projectTitle": "Formation des agents de la GIZ", "channelName": "Samuel James", "subscribers": "28k" }
    // ];

    // Do a map of projects
    const renderProjects = transformData().map((item, index) => {
        return (
            <Card title={item.projectTitle}
                style={{
                    cursor: "pointer",
                    backgroundColor: selectedCard === index ? "#E4E4E4" : ""
                }}
                onClick={e => handleCardClick(e, item, index)}
                subTitle={`Contributeurs: ${item.executant.map(e => {
                    return e.user.username;
                }).join(', ')}`}
                className="shadow-5 details-card-container" key={item.id}>
                <>
                    <p className="m-0 card—text" style={{ lineHeight: '1.5' }}>
                        {item.projectDescription !== '' ?
                            item.projectDescription : 'No description provided!!!'}
                    </p>
                </>

                <div className="p-card-footer pb-0">
                    <div className='projectFooter'>
                        <h6># {item.projectDatas} Data(s) </h6>
                        <h6>Created : {convertDates(item.created)} </h6>
                        <h6>Modified : {convertDates(item.updated)} </h6>

                        <Button title='Show more details for the project' onClick={(e) => {
                            handleCardClick(e, item, index);
                            navigate('/projectdetail');
                        }}>
                            <CgDetailsMore fontSize="20px" />
                            More...
                        </Button>
                        {/* <Button label="More..." title='Show more on the project' className="p-button-info" icon="pi pi-check"
                            onClick={(item) => navigate('/ProjectDetail')} /> */}
                    </div>
                </div>
            </Card>
        )
    });

    // const renderProjectCards = projectThematicList.map((item, pos) => {
    //     return (
    //         <Card title={item.projectTitle} subTitle={`Contributeurs: ${item.channelName}`} className="shadow-5" key={pos}>
    //             <>
    //                 <p className="m-0" style={{ lineHeight: '1.5' }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
    //             </>

    //             <div className="p-card-footer pb-0">
    //                 <div className='projectFooter'>
    //                     <h6># Data </h6>
    //                     <h6>Created : </h6>
    //                     <h6>Modified : </h6>
    //                     {/* <Button label="No" icon="pi pi-times" onClick={() => { console.log('vick'); }} className="p-button-text" /> */}
    //                     <Button label="More..." title='Show more on the project' className="p-button-info" icon="pi pi-check"
    //                         onClick={() => navigate('/ProjectDetail')} />
    //                 </div>
    //             </div>
    //         </Card>
    //     )
    // });

    return (
        <ScrollPanel style={{ width: '100%', height: '450px' }}>
            {/* {console.log(projects)} */}
            {/* {renderProjectCards} */}
            {renderProjects.length > 0 ? renderProjects
                :
                <p className='text-center'>
                    <div
                        className="alert alert-danger alert-dismissible fade show"
                        role="alert">
                        <strong>No project found.</strong> :(
                        {/* <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="alert"
                            aria-label="Close"></button> */}
                    </div>
                </p>
            }
        </ScrollPanel>
    )
}

export default ProjectLists;