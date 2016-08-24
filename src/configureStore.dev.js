import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistState } from 'redux-devtools';

import DevTools from './containers/DevTools';
import rootReducer from './redux/modules';

const getDebugSessionKey = () => {
    const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/);
    return (matches && matches.length > 0) ? matches[1] : undefined;
};

const enhancer = compose(
    applyMiddleware(thunkMiddleware),
    DevTools.instrument(),
    persistState(getDebugSessionKey())
);

export const configureStore = (initialState = {}) => {
    const store = createStore(rootReducer, initialState, enhancer);
    if (module.hot) {
        module.hot.accept('./redux/modules', () => {
            const nextRootReducer = require('./redux/modules').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
};

export default configureStore;
