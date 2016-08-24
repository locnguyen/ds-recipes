import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import Recipes from './containers/Recipes';

export default function getRoutes() {
    return (
        <Route path="/" component={App}>
            <IndexRoute component={Recipes} />
        </Route>
    );
}
