"use strict";

import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, Redirect, hashHistory} from 'react-router'
import {Provider} from 'react-redux';

// style
import './less/common.less';
import 'antd/dist/antd.css';

// store
import createStore from '../store';

// routers
import App from '../components/App';
import Login from '../components/Login';
import Home from '../components/Home';

let store = createStore();

render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Login}/>
                <Route path="/console" component={Home} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('container')
);
