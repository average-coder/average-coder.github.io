import { ADD_COMMENT, ADD_SUBCOMMENT, GET_ERRORS, GET_MESSAGES } from './types';
import axios from 'axios';

export const addComment = (name, comment, post) => (dispatch, getState) => {

    const body = { name: name, data: comment, post: post };

    const config = {
        header: {
            'Content-Type': 'application/json'
        }
    }

    axios.post('/comment/', body, config)
        .then((res) => {
            dispatch({
                type: ADD_COMMENT,
                payload: res.data
            });

            dispatch({
                type: GET_MESSAGES,
                payload: "COMMENT ADDED"
            });
        })
        .catch((err) => {
            const error = {
                msg: err.response.data,
                status: err.response.status
            };
            dispatch({
                type: GET_ERRORS,
                payload: error
            });
        })

}

export const addSubComment = (name, comment, parent_comment) => (dispatch, getState) => {

    const body = { name: name, data: comment, comment: parent_comment };

    const config = {
        header: {
            'Content-Type': 'application/json'
        }
    }

    axios.post('/sub-comment/', body, config)
        .then((res) => {
            const ans = {
                id: parent_comment,
                data: res.data
            }
            dispatch({
                type: ADD_SUBCOMMENT,
                payload: ans
            });
            dispatch({
                type: GET_MESSAGES,
                payload: "COMMENT ADDED"
            });
        })
        .catch((err) => {
            const error = {
                msg: err.response.data,
                status: err.response.status
            };
            dispatch({
                type: GET_ERRORS,
                payload: error
            });
        })

}