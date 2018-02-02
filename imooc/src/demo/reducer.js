import { combineReducers } from 'redux'
import * as Type from './common'

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

function logn(state={isAuth: false, user: '李云龙'}, action) {
  switch(action.type) {
    case Type.LOGNIN:
      return {...state, isAuth: true}
    case Type.LOGNOUT:
      return {...state, isAuth: false}
    default:
      return state
  }
}

// 合并reducer

const reducers = combineReducers({counter, logn})

export default reducers