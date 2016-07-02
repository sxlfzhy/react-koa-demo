"use strict";

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

// style
import './less/common.less';
import 'antd/dist/antd.css';

// store
import createStore from '../store';

// router
import AppRouter from '../components/Router';

let store = createStore();

render(
    <Provider store={store}>
        <AppRouter />
    </Provider>,
    document.getElementById('container')
);
