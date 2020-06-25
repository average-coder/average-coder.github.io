import { ADD_IMAGE, REMOVE_IMAGE } from '../actions/types';


const initialState = {
images: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case ADD_IMAGE:
        return { 
            ...state, 
            images: [...state.images, payload]
        }
    
    case REMOVE_IMAGE:
        return{
            ...state,
            images: state.images.filter((item) => item.id !== payload)
        } 

    default:
        return state
    }
}
