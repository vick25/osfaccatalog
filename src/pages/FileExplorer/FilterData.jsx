import React, { useContext } from 'react';
import DispatchContext from '../../contexts/DispatchContext';
import StateContext from '../../contexts/StateContext';
import {
    Form, Button
} from "react-bootstrap";

const FilterData = () => {
    const GlobalDispatch = useContext(DispatchContext);
    const GlobalState = useContext(StateContext);

    // const initialState = {
    //     sort: "lowToHigh",
    //     searchQuery: ""
    // };

    // const reducer = (state, action) => {
    //     switch (action.type) {
    //         case "SORT_BY_NAME":
    //             return {
    //                 ...state,
    //                 sort: action.payload
    //             };
    //         case "SEARCH":
    //             return { ...state, searchQuery: action.payload };
    //         case "CLEAR_FILTERS":
    //             return {
    //                 searchQuery: ""
    //             }
    //         default:
    //             return state;
    //     }
    // }

    // const [state, dispatch] = useReducer(reducer, initialState);


    return (
        <div className='filters'>
            <span className='title'>Filter Data</span>
            <span>
                <Form.Check inline label="Ascending" name="group1" type="radio" id={`inline-1`}
                    onChange={() =>
                        GlobalDispatch({
                            type: "SORT_BY_NAME",
                            payload: "lowToHigh"
                        })
                    }
                    checked={GlobalState.sort === "lowToHigh" ? true : false}
                />
            </span>
            <span>
                <Form.Check inline label="Descending" name="group1" type="radio" id={`inline-2`}
                    onChange={() =>
                        GlobalDispatch({
                            type: "SORT_BY_NAME",
                            payload: "highToLow"
                        })
                    }
                    checked={GlobalState.sort === "highToLow" ? true : false} />
            </span>
            {/* <Form.Check inline label="Descending" name="group1" type="checkbox" id={`inline-3`} /> */}
            <Button variant="light" onClick={() => GlobalDispatch({
                type: "CLEAR_FILTERS"
            })}>
                Clear Filters
            </Button>
        </div>
    )
}

export default FilterData;