// 模拟redux
export function createStore(reducer) {
  let currentState = null //当前的state
  let currentListener = []  //当前监听的reducer

  // 返回state, 可以获取state的唯一途径
  function getState() {
    return currentState
  }

  // 订阅监听的listener， 每次派发action时，就可以监听state的变化
  function describe(listener) {
    currentListener.push(listener)
  }

  // 派发action，修改state
  function dispatch(action) {
    currentState = reducer(currentState, action)
    console.log(currentState)
    currentListener.forEach(v => v())
    return action
  }

  // 初始化state
  dispatch({type: '@@redux-xizhou'})
  return {getState, describe, dispatch}
}