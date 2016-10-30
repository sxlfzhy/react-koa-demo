import {Actions} from '../constants'

export default (state = {}, action) => {
  switch (action.type) {
    case Actions.SET_USER:
      return {info: action.user}
    case Actions.LOGOUT:
      return {}
    default:
      return state
  }
}
