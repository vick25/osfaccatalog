import React, { useContext, useState } from 'react';
import { Card, Button } from "react-bootstrap";
import { filesize } from 'filesize';
import axios from 'axios';
import fileDownload from 'js-file-download';
import StateContext from '../../contexts/StateContext';

const SingleFile = ({ data }) => {
    const GlobalState = useContext(StateContext);
    const [error, setError] = useState(false);

    const viewer = `<iframe src="https://docs.google.com/gview?url=[path_to_file]embedded=truestyle=" width="600px" height="500px" frameborder="0"/>`

    // async function getFileStats(url) {
    //     let fileBlob;
    //     await fetch(url).then((res) => {
    //         fileBlob = res.blob();
    //         return fileBlob;
    //     }).then((fileBlob) => {
    //         // return fileBlob.size;
    //         return ([fileBlob.size, fileBlob.type]);
    //     });
    // }

    const fileInformation = (size) => {
        return filesize(size, { base: 10, standard: 'jedec' });
    }

    const handleDownload = async (e, url) => {
        e.preventDefault();
        await axios.get(url, {
            responseType: 'blob',
        }, {
            headers: {
                'Content-Disposition': 'attachment'
            }
        })
            .then((res) => {
                fileDownload(res.data, url.slice(url.lastIndexOf('/') + 1));
            });
    }

    function handleHide(id, title) {
        let confirmation = window.confirm(
            `Are you sure you want to delete recipe: ${title}`
        );
        if (confirmation) {
            axios
                .delete(`http://localhost:8000/recipes/${id}`)
                .then((res) => {
                    // updateRecipes();
                    console.log(res);
                })
                .catch((err) => {
                    setError(true);
                });
        }
    }

    return (
        <div className="datas">
            <Card>
                {data.thumbnail && <Card.Img variant="top" src={data.thumbnail} alt={data.dataTitle} />}
                <Card.Body title={data.dataTitle}>
                    <Card.Title className='text'>{data.dataTitle}</Card.Title>
                    <Card.Subtitle style={{ paddingBottom: 10 }}>
                        <div className='text'>Project: {data.projectTitle}</div>
                        <div>Category: {data.categoryTitle}</div>
                        <div>Code: {data.dataCode}</div>
                        <div>File (type/size): {data.fileDoc.split('.').pop()}, {fileInformation(data.fileSize)}</div>
                    </Card.Subtitle>
                    <div className='datafooter'>
                        {GlobalState.userIsLoggedIn && <Button variant="danger" className='mr-2'>Hide</Button>}
                        <Button disabled={!data.dataStatus || data.fileSize < 0}
                            onClick={(e) => handleDownload(e, data.fileDoc)}>
                            {!data.dataStatus || data.fileSize < 0 ? "Not available" : "Download"}
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default SingleFile;