import axios from 'axios'
import * as types from './reducer-type'
import io from 'socket.io-client'
const socket = io('ws://localhost:8888')

// reducer
const initState = {
  chatmsg: [],
  unread: 0
}

export function chat(state = initState, action) {
  switch (action.type) {
    case types.GET_MSG_LIST:
      return {...state, chatmsg: action.payload.data, unread: action.payload.data.filter(v => !v.read).length, users: action.payload.users}
    case types.RECV_MSG:
      return {...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + 1}
    default:
      return state 
  }
}

// action
function msgList(msg) {
  return {type: types.GET_MSG_LIST, payload: msg}
}

// 获取信息列表
export function getMsgList() {
  return dispatch => {
    axios.get('/chat/getmsglist').then((res => {
      console.log(res)
      if (res.status === 200 && res.data.code === 0) {
        dispatch(msgList(res.data))
      }
    }))
  }
}

// 发送信息

export function sendMsg({from, to, msg}) {
  return dispatch => {
    socket.emit('sendMsg', {from, to, msg})
  }
}


function recvMsg(msg) {
  return {type: types.RECV_MSG, payload: msg}
}
// 接收返回的信息
export function getRecvMsg() {
  return dispatch => {
    socket.on('rescMsg', (data) => {
      console.log(data)
      dispatch(recvMsg(data))
    })
  }
}
