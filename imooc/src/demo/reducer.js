import { combineReducers } from 'redux'
import axios from 'axios'
import * as Type from './common'
import { userData } from './action.js'

function counter(state=10, action) {
  switch(action.type) {
    case Type.ADD_GUN:
      return state + 1
    case Type.REMOVE_GUN:
      return state - 1 
    default:
      return state
  }
}

export function getUserData() {
  return dispatch => {
    axios.get('/user').then((res) => {
      if (res.status === 200) {
        dispatch(userData(res.data))
      }
    })
  }
}

const initState = {
  isAuth: false,
  user: '李云龙'
}

function logn(state=initState, action) {
  if (action.payload) {
    console.log(action.payload, action.type, state)
  }
  switch(action.type) {
    case Type.LOGNIN:
      return {...state, isAuth: true}
    case Type.LOGNOUT:
      return {...state, isAuth: false}
    case Type.USER_DATA:
      return {...state, payload: action.payload}
    default:
      return state
  }
}

// 合并reducer

const reducers = combineReducers({counter, logn})

export default reducers