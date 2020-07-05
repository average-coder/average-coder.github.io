import { SET_SEARCH } from '../actions/types';


const initialState = {
    search_text: '',
    result: [],
}

export default function (state = initialState, action) {
    switch (action.type) {

        case SET_SEARCH:
            return {
                ...state,
                search_text: action.payload.text,
                result: action.payload.result
            }

        default:
            return state
    }
}