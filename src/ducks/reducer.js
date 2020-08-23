import { combineReducers } from 'redux';
import animesReducer from './animes';

export default combineReducers({
    animes: animesReducer,
});