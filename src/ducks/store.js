import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';

const initialState = {
    animes: []
};

const middleware = [thunk];

const store = createStore(reducer, initialState, applyMiddleware(...middleware));

export default store;


