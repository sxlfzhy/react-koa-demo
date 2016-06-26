import React from 'react';
import './less/app.less';
export default class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="app_bg">
                {this.props.children}
            </div>
        );
    }
}
