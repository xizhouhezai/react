import { createStore } from './xi-redux'

function couter (state=0, action) {
  switch (action.type) {
    case '加一':
      return state + 1
    case '减一':
      return state - 1
    default:
      return state
  }
}

let store = createStore(couter)

let listener = function() {
  let sum = store.getState()
  console.log(`sum: ${sum}`)
}

store.describe(listener)

store.dispatch({type: '加一'})
store.dispatch({ type: '加一' })
store.dispatch({ type: '减一' })