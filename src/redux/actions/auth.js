import axios from 'axios';
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_USER, GET_ERRORS, SET_LOADING } from './types';

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  const token = getState().auth.token;

  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  }

  if (token) {
    config.header['Authorization'] = `Token ${token}`;
  }
  axios.get('/auth/user/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch({
        type: AUTH_ERROR
      });
    })
}


export const login = (username, password) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({ username, password });

  dispatch({
    type: SET_LOADING
  });

  axios
    .post('/auth/login/', body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: SET_LOADING
      });
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch({
        type: SET_LOADING
      });
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

export const logout = () => (dispatch, getState) => {


  axios.post('/auth/logout/', null, tokenConfig(getState))
    .then(
      res => {
        dispatch({
          type: LOGOUT_USER
        });
      }
    )
    .catch(err => { console.log(err) })
}

export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;
};