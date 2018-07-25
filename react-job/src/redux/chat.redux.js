import axios from 'axios'
import * as types from './reducer-type'
import io from 'socket.io-client'
const socket = io('ws://www.xizhouhezai.com:3303')

// reducer
const initState = {
  chatmsg: [],
  users: {},
  unread: 0
}

export function chat(state = initState, action) {
  switch (action.type) {
    case types.GET_MSG_LIST:
      return {...state, chatmsg: action.payload.data, unread: action.payload.data.filter(v => !v.read && v.to === action.userid).length, users: action.payload.users}
    case types.RECV_MSG:
      const n = action.payload.to === action.userid ? 1 : 0
      return {...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + n}
    default:
      return state 
  }
}

// action
function msgList(msg, userid) {
  return {type: types.GET_MSG_LIST, payload: msg, userid: userid}
}

// 获取信息列表
export function getMsgList() {
  return (dispatch, getState) => {
    axios.get('/chat/getmsglist').then((res => {
      if (res.status === 200 && res.data.code === 0) {
        const userid = getState().user._id
        dispatch(msgList(res.data, userid))
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


function recvMsg(msg, userid) {
  return {userid, type: types.RECV_MSG, payload: msg}
}
// 接收返回的信息
export function getRecvMsg() {
  return (dispatch, getState) => {
    socket.on('rescMsg', (data) => {
      console.log(data)
      const userid = getState().user._id
      dispatch(recvMsg(data, userid))
    })
  }
}
