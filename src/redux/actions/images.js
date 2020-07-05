import { ADD_IMAGE, REMOVE_IMAGE, GET_MESSAGES, GET_ERRORS } from './types';
import axios from 'axios';
import { tokenConfig } from './auth';


export const addImage = (image) => (dispatch, getState) => {

  const token = getState().auth.token;


  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  const formData = new FormData();
  formData.append('image', image);

  axios.post('/image/', formData, config)
    .then(
      (res) => {
        dispatch({
          type: ADD_IMAGE,
          payload: res.data
        })
        dispatch({
          type: GET_MESSAGES,
          payload: "IMAGE ADDED"
        });
      }
    )
    .catch(
      (err) => {
        const error = {
          msg: err.response.data,
          status: err.response.status
        };
        dispatch({
          type: GET_ERRORS,
          payload: error
        });
      }
    )



}


export const removeImage = (id) => (dispatch, getState) => {

  axios.delete(`/image/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: REMOVE_IMAGE,
        payload: id
      });
      dispatch({
        type: GET_MESSAGES,
        payload: "IMAGE DELETED"
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