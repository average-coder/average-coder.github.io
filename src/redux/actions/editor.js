import { GET_POSTS_E, DELETE_POST, GET_ERRORS, GET_MESSAGES, SET_LOADING } from './types';
import axios from 'axios';
import { tokenConfig } from './auth';

export const getEditorPosts = () => (dispatch, getState) => {
    dispatch({
        type: SET_LOADING
    })

    axios.get('/editor/', tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_POSTS_E,
                payload: res.data
            });
            dispatch({
                type: SET_LOADING
            })
        })
        .catch((err) => {
            const error = {
                msg: err.response.data,
                status: err.response.status
            };
            dispatch({
                type: SET_LOADING
            })
            dispatch({
                type: GET_ERRORS,
                payload: error
            });
        })

}

export const deletePost = (id) => (dispatch, getState) => {
    dispatch({
        type: SET_LOADING
    })

    axios.delete(`/editor/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_POST,
                payload: id
            });
            dispatch({
                type: SET_LOADING
            })
            dispatch({
                type: GET_MESSAGES,
                payload: "POST DELETED"
            });
        })
        .catch((err) => {
            const error = {
                msg: err.response.data,
                status: err.response.status
            };
            dispatch({
                type: SET_LOADING
            })
            dispatch({
                type: GET_ERRORS,
                payload: error
            });
        })

}