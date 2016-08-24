import React from 'react';
import DevTools from './containers/DevTools';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div className="container">
            {this.props.children}
            <DevTools />
        </div>
        );
    }
}

App.propTypes = {
    children: React.PropTypes.object
};