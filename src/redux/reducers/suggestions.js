import { GET_SUGGESTIONS } from '../actions/types';

const initialState = {
    suggestions: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case GET_SUGGESTIONS:
            return { ...state, suggestions: payload }

        default:
            return state
    }
}
