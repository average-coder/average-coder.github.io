import { GET_POSTS_E, DELETE_POST } from '../actions/types';


const initialState = {
    posts: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case GET_POSTS_E:
            return { ...state, posts: payload }

        case DELETE_POST:
            return { ...state, posts: state.posts.filter((item) => item.id !== payload) }

        default:
            return state
    }
}
