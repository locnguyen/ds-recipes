import React from 'react';
import ReactDom from 'react-dom';
import throttle from 'lodash/throttle';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Root from './containers/Root';
import configureStore from './configureStore';
import getRoutes from './routes';
import { saveStateTree, loadStateTree } from './localStorage';

const existingState = loadStateTree();
console.log('debug existingState', existingState); // eslint-disable-line no-console
const store = configureStore(existingState);
const history = syncHistoryWithStore(browserHistory, store);
store.subscribe(throttle(() => saveStateTree(store.getState()), 500));

ReactDom.render(
    <Root store={store} routes={getRoutes()} history={history} />,
    document.getElementById('root')
);
