import { combineReducers } from 'redux'
import user from './user'
import configure from './configure'

export default combineReducers(
  {
    user,
    configure
  }
)
