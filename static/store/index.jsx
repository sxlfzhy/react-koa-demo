"use strict";

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import rootReducers from '../reducers';


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

// 之所以不直接返回 store 而是返回 createStore 是为了让外界可以传递initialState。
export default initialState => createStoreWithMiddleware(rootReducers, initialState);
