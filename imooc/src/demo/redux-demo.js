import { createStore } from 'redux'

// 第一步： 创建reducer
function counter(state=0, action) {
  switch(action.type) {
    case '加机关枪':
      return state + 1
    case '减机关枪':
      return state - 1
    default:
      return 10
  }
}

// 第二步：创建store
const store = createStore(counter)

// 第三步：订阅一个事件
function listenr() {
  // 获取状态
  const current = store.getState()
  console.log(`现在有机枪${current}把`)
}
store.subscribe(listenr)


// 派发事件

store.dispatch({type: '加机关枪'})
store.dispatch({type: '加机关枪'})
store.dispatch({type: '减机关枪'})
