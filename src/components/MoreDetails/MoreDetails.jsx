import React, { useContext, useState } from 'react';
import { Button, Col, Row } from "react-bootstrap";
import StateContext from '../../contexts/StateContext';

const MoreDetails = () => {
    const GlobalState = useContext(StateContext);
    const { updated } = GlobalState.projectMoreDetails;

    const [fileDetails] = useState({
        fileName: "my-file.pdf",
        fileSize: 100,
        lastModified: "2023-07-26 03:42:08",
        numberOfViews: 10,
    });


    return (
        <>
            {/* {console.log(updated)} */}
            <div>Select a project to see the details</div>
            <div>
                <Row>
                    <div className='details-preview'>
                        <img alt="preview" src='' loading='lazy' />
                    </div>
                </Row>
                <Row>
                    <Col>
                        <div className="details-preview-more">
                            <ul>
                                <li>
                                    <strong>File name</strong>
                                    <span>{fileDetails.fileName}</span>
                                </li>
                                <li>
                                    <strong>File size</strong>
                                    <span>{fileDetails.fileSize} KB</span>
                                </li>
                                <li>
                                    <strong>Last modified</strong>
                                    <span>{updated}</span>
                                </li>
                                <li>
                                    <strong>Number of views</strong>
                                    <span>{fileDetails.numberOfViews}</span>
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col>
                        <Button>Download</Button>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default MoreDetails