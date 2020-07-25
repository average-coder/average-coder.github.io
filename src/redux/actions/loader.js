import { SET_LOADING } from './types';

export const setLoader = () => (dispatch, getState) => {
    dispatch({
        type: SET_LOADING
    })
}