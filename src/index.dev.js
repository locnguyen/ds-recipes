import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import throttle from 'lodash/throttle';

import Root from './containers/Root';
import configureStore from './configureStore';
import getRoutes from './routes';
import { saveStateTree, loadStateTree } from './localStorage';

const existingState = loadStateTree();
console.log('debug existingState', existingState);  // eslint-disable-line no-console
const store = configureStore(existingState);
const history = syncHistoryWithStore(browserHistory, store);
store.subscribe(throttle(() => saveStateTree(store.getState()), 500));

function renderApp(routes) {
    ReactDom.render(
        <AppContainer>
            <Root store={store} routes={routes} history={history} />
        </AppContainer>,
        document.getElementById('root')
    );
}

if (module.hot) {
    module.hot.accept('./routes', () => {
        const getNextRoutes = require('./routes').default;
        renderApp(getNextRoutes());
    });
}

renderApp(getRoutes());
