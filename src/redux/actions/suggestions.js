import { GET_SUGGESTIONS, GET_ERRORS } from './types';
import axios from 'axios';

export const getSuggestions = () => (dispatch, getState) =>{
    const config = {
        header:{
            'Content-Type': 'application/json'
        }
    }

    axios.get('/suggestions/', config)
        .then((res)=>{
            dispatch({
                type: GET_SUGGESTIONS,
                payload: res.data
            })
        })
        .catch((err)=>{
            const error ={
                msg: "SOME ERROR OCCURED",
                status: 10401
              };
              dispatch({
                type: GET_ERRORS,
                payload: error
              });
        })
}
