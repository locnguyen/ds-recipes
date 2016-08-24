import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './redux/modules';

const enhancer = applyMiddleware(thunkMiddleware);

export const configureStore = (initialState = {}) => (createStore(rootReducer, initialState, enhancer));

export default configureStore;
