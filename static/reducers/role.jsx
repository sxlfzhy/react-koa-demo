"use strict";

import {MENU_INIT, MENU_REFER} from '../constants';
import React from 'react';

import {Icon} from 'antd';

/**
 * 导航栏初始化
 */
const menuInit = () => {
    return {
        menus: [
            {
                key: 'sub-activity',
                name: <span><Icon type="appstore-o" /><span>活动管理</span></span>,
                type: 'sub',
                children: [
                    {
                        key: 'activities',
                        name: <span>活动列表</span>,
                        type: 'leaf',
                        link: '/console/activities'
                    }
                ]
            }
        ],
        open: [],
        current: []
    }
}

/**
 * 刷新路径信息
 */
const menuRefer = (state, path) => {

    state.current = state.open = []
    state.menus.forEach(item => {
        const c = item.children.filter(child => child.link === path)
        if (c.length > 0) {
            state.current = c;
            state.open = [item];
            return false
        }
    })
}

export default (state = {}, action) => {
    switch (action.type) {
        case MENU_INIT:
            return state.menus ? state : Object.assign(state, menuInit())

        case MENU_REFER:
            menuRefer(state, action.path)
            return state

        default:
            return state
    }
}
