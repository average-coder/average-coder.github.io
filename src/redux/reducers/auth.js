import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_USER } from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: {
        id: null,
        email: null,
        username: null,
        first_name: null,
        last_name: null,
    }
}

export default function (state = initialState, action) {
    switch (action.type) {

        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }

        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }

        case AUTH_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                user: null,
            }

        case LOGIN_FAIL:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                user: null,
            }

        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            }

        case LOGOUT_USER:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                user: null
            }


        default:
            return state
    }
}