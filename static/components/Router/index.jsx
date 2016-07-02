"use strict";

import React from 'react';
import {Router, Route, IndexRoute, Redirect, hashHistory} from 'react-router'

// routers
import App from '../App';
import Login from '../Login';
import Home from '../Home';
import Welcome from '../Welcome';
import Activities from '../Activity/list';

class AppRouter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Login}/>
                    <Route path="console" component={Home}>
                        <IndexRoute component={Welcome}/>
                        <Route path="activities" component={Activities}/>
                    </Route>
                </Route>
            </Router>
        );
    }
}

export default AppRouter;
