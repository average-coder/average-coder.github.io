import axios from 'axios';
import { GET_MESSAGES, GET_ERRORS } from '../actions/types';


export const requestPost = (req) => (dispatch, getState) =>{

    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

    if(req === "" || req === null){

      const error ={
        msg: "PLEASE ENTER A VALID REQUEST",
        status: 10401
      };
    
    dispatch({
        type: GET_ERRORS,
        payload: error
    });

      return
    }

    const body = { data:req }

    axios.post('/post-request/', body, config)
        .then((res) => {

            dispatch({
                type: GET_MESSAGES,
                payload: "THANK YOU, YOUR REQUEST HAS BEEN SENT"
            });

        })
        .catch((err) => {

            const error ={
                msg: "SORRY, AN ERROR OCCURED. PLEASE TRY AGAIN LATER",
                status: 10401
              };
            
            dispatch({
                type: GET_ERRORS,
                payload: error
            });

        })

}