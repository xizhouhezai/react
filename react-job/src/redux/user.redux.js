import axios from 'axios'
import * as types from './reducer-type'
import { getRedirectPath } from '../util/util'

let initState = {
	user: '',
	type: '',
	msg: '',
	redirectTo: '',
	avatar: ''
}

export function user(state = initState, action) {
	switch (action.type) {
		case types.ERROR_MSG:
			return {...state, msg: action.msg}
		case types.AUTH_SUCCESS:
			return {...state, redirectTo: getRedirectPath(action.payload), ...action.payload}
		case types.LOAD_DATA:
			return {...state, ...action.payload}
		default:
			return state
	}
}

function errorMsg(msg) {
	return {type: types.ERROR_MSG, msg: msg}
}
// function registerSuccess(data) {
// 	return {type: types.REGISTER_SUCCESS, payload: data}
// }
// function loginSuccess(data) {
// 	return {type: types.LOGIN_SUCCESS, payload: data}
// }
function authSuccess(data) {
	return {type: types.AUTH_SUCCESS, payload: data}
}

// 触发reducer的函数

// 更新
export function update(data) {
	console.log(data)
	if (!data.avatar) {
		return errorMsg('请选择用户头像')
	}
	return dispatch=> {
		axios.post('/user/update', data)
			.then((res) => {
				if (res.data.code === 0 && res.status === 200) {
					console.log(res.data.data)
					dispatch(authSuccess(res.data.data))
				} else {
					dispatch(errorMsg(res.data.msg))
				}
			})
	}
}

// 登录
export function login({user, pwd}) {
	if (!user || !pwd) {
		return errorMsg('用户名和密码不能为空！')
	}
	return dispatch=> {
		axios.post('/user/login', {user, pwd})
			.then((res) => {
				if (res.data.code === 0 && res.status === 200) {
					console.log(res.data.data)
					dispatch(authSuccess(res.data.data))
				} else {
					dispatch(errorMsg(res.data.msg))
				}
			})
	}
}

/**
 * 注册的校验
 * @params {obj} param0 
 */
export function register({user, pwd, repeatpwd, type}) {
	if (!user || !pwd || !type) {
		return errorMsg('用户名和密码必须输入！')
	}
	if (pwd !== repeatpwd) {
		return errorMsg('两次密码输入不一致!')
	}
	return dispatch=> {
		axios.post('/user/register', {user, pwd, type})
			.then((res) => {
				if (res.data.code === 0 && res.status === 200) {
					dispatch(authSuccess({user, pwd, type}))
				} else {
					dispatch(errorMsg(res.data.msg))
				}
			})
	}
}

export function loadData(data) {
	return dispatch => {
		dispatch({type: types.LOAD_DATA, payload: data})
	}
}
