import { GET_SUGGESTIONS, GET_ERRORS, SET_LOADING } from './types';
import axios from 'axios';

export const getSuggestions = () => (dispatch, getState) => {
    const config = {
        header: {
            'Content-Type': 'application/json'
        }
    }
    dispatch({
        type: SET_LOADING
    })

    axios.get('/suggestions/', config)
        .then((res) => {
            dispatch({
                type: GET_SUGGESTIONS,
                payload: res.data
            })
            dispatch({
                type: SET_LOADING
            })
        })
        .catch((err) => {
            const error = {
                msg: "SOME ERROR OCCURED",
                status: 10401
            };
            dispatch({
                type: GET_ERRORS,
                payload: error
            });
            dispatch({
                type: SET_LOADING
            })
        })
}
