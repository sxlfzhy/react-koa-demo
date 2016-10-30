import {Actions, remoteUrl as URL} from '../constants'
import Fetch from '../../../libs/Fetch'

export function setUser (user) {
  return {
    type: Actions.SET_USER,
    user
  }
}

export function logout () {
  Fetch.post(URL.LOGOUT)
  return {
    type: Actions.LOGOUT
  }
}
