
import {MENU_INIT, MENU_REFER} from '../constants';

/**
 * 初始化 导航菜单列表
 * @return {[type]} [description]
 */
function menuInit() {
    return {
        type: MENU_INIT
    }
}

/**
 * 更新菜单列表状态
 */
function menuUpdate(path) {
    return {
        type: MENU_REFER,
        path
    }
}

export function menuRefer(path) {
    return dispatch => {
        dispatch(menuInit())

        dispatch(menuUpdate(path))
    }
}
