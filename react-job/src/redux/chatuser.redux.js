import axios from 'axios'
import * as types from './reducer-type'

// reducer
let initState = {
  userlist: []
}
export function chatuser(state = initState, action) {
  switch (action.type) {
    case types.USER_LIST:
      return {...state, userlist: action.payload}
    default:
      return state
  }
}

function userList(data) {
  return{type: types.USER_LIST, payload: data}
}

// action

export function getUserList(type) {
  return dispatch => {
    axios.get('user/list?type=' + type)
      .then((res) => {
        if (res.data.code === 0) {
          dispatch(userList(res.data.data))
        }
      })
  }
} 