import { GET_POST, CLEAR_POST, ADD_COMMENT, ADD_SUBCOMMENT } from '../actions/types';


const initialState = {
    id: 0,
    comments: [],
    title: '',
    date_posted: '',
    slug: '',
    author: '',
    username: '',
}

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_POST:
            return {
                id: action.payload.id,
                comments: action.payload.comments,
                title: action.payload.title,
                date_posted: action.payload.date_posted,
                data: action.payload.data,
                slug: action.payload.slug,
                author: action.payload.author,
                username: action.payload.username
            }

        case CLEAR_POST:
            return initialState

        case ADD_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.payload]
            }

        case ADD_SUBCOMMENT:
            return {
                ...state,
                comments: (state.comments).map((item) => { if (item.id === action.payload.id) { if (item.sub_comments) { return ({ ...item, sub_comments: [...item.sub_comments, action.payload.data] }) } else { return ({ ...item, sub_comments: [action.payload.data] }) } } else { return (item) } })
            }

        default:
            return state;
    }
}