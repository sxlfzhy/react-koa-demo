"use strict";

import React from 'react';
import {Router, Route, IndexRoute, Redirect, hashHistory} from 'react-router'

// routers
import App from '../App';
import Login from '../Login';
import Home from '../Home';
import Welcome from '../Welcome';
import sub1 from '../SubListContent/sub-1-1';
import sub2 from '../SubListContent/sub-2-1';

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
                        <Route path="sub-1-1" component={sub1}/>
                        <Route path="sub-2-1" component={sub2}/>
                    </Route>
                </Route>
            </Router>
        );
    }
}

export default AppRouter;
