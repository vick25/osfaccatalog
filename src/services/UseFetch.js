import React, { useState, useEffect } from "react";
import Axios from "axios";

const useFetch = (url) => {
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        async function GetAllData() {
            try {
                const response = await Axios.get(url);
                setResponses(response.data);
                console.log('1', response.data);
            } catch (error) {
                console.log(error.response);
            }
            // console.log(Axios.get(url));
        }
        GetAllData();
    }, []);
    // return responses;
}

export default useFetch;