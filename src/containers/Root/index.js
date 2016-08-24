import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

export default class Root extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={this.props.store}>
                <Router history={this.props.history}>
                    {this.props.routes}
                </Router>
            </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object,
    history: PropTypes.object,
    routes: PropTypes.object
};
