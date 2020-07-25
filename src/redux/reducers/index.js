import { combineReducers } from 'redux';
import auth from "./auth";
import errors from "./errors";
import messages from "./messages";
import posts from './posts';
import search from './search';
import images from './images';
import editor from './editor';
import suggestions from './suggestions';
import loader from './loader';

export default combineReducers({
    auth,
    errors,
    messages,
    posts,
    search,
    images,
    editor,
    suggestions,
    loader
})