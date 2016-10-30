import {Actions, remoteUrl as URL} from '../constants'
import Fetch from '../../../libs/Fetch'

function initAfter (response) {
  return {
    type: Actions.CFG_INIT_AFTER,
    response
  }
}

export function init () {
  return (dispatch) => {
    Fetch.post(URL.CFG_INIT)
      .then((res) => dispatch(initAfter(res)))
  }
}
