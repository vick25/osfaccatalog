import React from 'react';
import { useNavigate } from "react-router-dom";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';


const Projects = () => {
    const navigate = useNavigate();

    const projectThematicList = [
        { "projectTitle": "Etude sur la dynamique des feux de brousse", "channelName": "Qaifi Khan", "subscribers": "20k" },
        { "projectTitle": "Etude des tourbieres dans la Province de la Mongala", "channelName": "John Doe", "subscribers": "7k" },
        { "projectTitle": "Formation des agents de la GIZ", "channelName": "Samuel James", "subscribers": "28k" }
    ]

    // Do a map of projects
    const renderProjectCards = projectThematicList.map((item, pos) => {
        return (
            <Card title={item.projectTitle} subTitle="Contributeurs: " className="shadow-5" key={pos}>
                <p className="m-0" style={{ lineHeight: '1.5' }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>

                <div className="p-card-footer pb-0">
                    <div className='projectFooter'>
                        <h6># Data </h6>
                        <h6>Created : </h6>
                        <h6>Modified : </h6>
                        {/* <Button label="No" icon="pi pi-times" onClick={() => { console.log('vick'); }} className="p-button-text" /> */}
                        <Button label="More..." title='Show more on the project' className="p-button-info" icon="pi pi-check"
                            onClick={() => navigate('/ProjectDetail')} />
                    </div>
                </div>
            </Card>
        )
    });

    return (
        <ScrollPanel style={{ width: '100%', height: '450px' }}>
            {renderProjectCards}
        </ScrollPanel>
    )
}

export default Projects;