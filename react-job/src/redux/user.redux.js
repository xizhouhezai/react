import axios from 'axios'
import * as types from './reducerType'
import { getRedirectPath } from '../util/util'

let initState = {
	isAuth: false,
	pwd: '',
	user: '',
	type: '',
	msg: '',
	redirectTo: ''
}

export function user(state = initState, action) {
	switch (action.type) {
		case types.ERROR_MSG:
			return {...state, isAuth: false, msg: action.msg}
		case types.REGISTER_SUCCESS:
			return {...state, isAuth: true, redirectTo: getRedirectPath(action.payload), ...action.payload}
		case types.LOGIN_SUCCESS:
			return {...state, isAuth: true, redirectTo: getRedirectPath(action.payload), ...action.payload}
		default:
			return state
	}
}

function errorMsg(msg) {
	return {type: types.ERROR_MSG, msg: msg}
}
function registerSuccess(data) {
	return {type: types.REGISTER_SUCCESS, payload: data}
}
function loginSuccess(data) {
	return {type: types.LOGIN_SUCCESS, payload: data}
}

// 触发reducer的函数

// 登录
export function login({user, pwd}) {
	if (!user || !pwd) {
		return errorMsg('用户名和密码不能为空！')
	}
	return dispatch=> {
		axios.post('/user/login', {user, pwd})
			.then((res) => {
				if (res.data.code === 0 && res.status === 200) {
					dispatch(loginSuccess(res.data.data))
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
					dispatch(registerSuccess({user, pwd, type}))
				} else {
					dispatch(errorMsg(res.data.msg))
				}
			})
	}
}
