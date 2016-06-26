
import {LOGIN_BEFORE, LOGIN_AFTER, LOGOUT, remoteUrl as URL} from '../constants';
import Fetch from '../../libs/Fetch';
import crypto from 'crypto';

function loginBefore(user) {
    return {
        type: LOGIN_BEFORE,
        user
    }
}

function loginAfter(response) {
    return {
        type: LOGIN_AFTER,
        response
    }
}

export function login(user) {
    return dispatch => {
        dispatch(loginBefore(user))

        // password md5
        const md5 = crypto.createHash('sha1');
        md5.update(user.password);
        user.password = md5.digest('hex');

        Fetch.post(URL.LOGIN, user)
            .then(res => dispatch(loginAfter(res)))
    }
}

function logoutAfter() {
    return {
        type: LOGOUT
    }
}

export function logout() {
    return dispatch => {

        Fetch.post(URL.LOGOUT);
        dispatch(logoutAfter());
    }
}
