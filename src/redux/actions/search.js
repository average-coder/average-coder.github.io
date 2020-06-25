import { SET_SEARCH, GET_ERRORS } from './types';
import axios from 'axios';


export const getSearch = (search_text) => (dispatch, getState) =>{

    axios.get('/list/', { params: { search: search_text}})
            .then(res => {
                const data = res.data;
                dispatch({
                    type: SET_SEARCH,
                    payload: {
                        text: search_text,
                        result: data
                    }
                })
            })
            .catch(err => {
                const error ={
                    msg: 'CONNECTION ERROR',
                    status: 10401
                  };
                  dispatch({
                    type: GET_ERRORS,
                    payload: error
                  });
            })
}