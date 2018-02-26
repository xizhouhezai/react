import axios from 'axios'
import * as types from './reducer-type'

// reducer
const initState = {
  msg: [],
  read: 0
}

export function chat(state = initState, action) {
  switch (action.type) {
    case types.GET_MSG_LIST:
    default:
      return state 
  }
}

// action
function msgList(msg) {
  return {type: types.GET_MSG_LIST, payload: msg}
}

export function getMsgList() {
  return dispatch => {
    axios.get('/chat/getmsglist').then((res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(msgList(res.data.msg))
      }
    }))
  }
}