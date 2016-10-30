import {Actions} from '../constants'

/**
 * 接口返回成功
 * @type {[type]}
 */
const initAfter = (res) => {
  if (res.success) {
    return res.data
  } else {
    return {}
  }
}

export default (state = {}, action) => {
  switch (action.type) {
    case Actions.CFG_INIT_AFTER:
      return initAfter(action.response)
    default:
      return state
  }
}
