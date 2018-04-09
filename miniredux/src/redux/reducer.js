const ADD_GUN = '加一把机关枪'
const MINUS_GUN = '减一把机关枪'

const initstate = {
  num: 10,
  user: '大洲'
}
export function counter(state = initstate, action) {
  switch(action.type) {
    case ADD_GUN:
      return {...state, num: state.num + 1}
    case MINUS_GUN:
      return { ...state, num: state.num - 1 }
    default:
      return state
  }
}

export function addgun() {
  return { type: ADD_GUN }
}

export function minusgun() {
  return { type: MINUS_GUN }
}