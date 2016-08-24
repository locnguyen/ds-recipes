import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import recipes from './recipes';

const rootReducer = combineReducers({
    routing: routerReducer,
    recipes
});

export default rootReducer;
