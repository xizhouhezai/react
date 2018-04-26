import React from 'react'
import { Redirect } from 'react-router-dom'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux'
import Logo from '../../component/logo/logo'
import WrapperForm from '../../component/imooc-form/imooc-form'

// import axios from 'axios'

// 高阶组件的属性代理和反向继承
/**
 * 什么是高阶组件
 * 高阶组件就是一个组件内部再返回一个组件
 * 从而代理返回组件的属性和方法，方便提取
 * 多个组件共用的方法和属性
 * */
// 属性代理

// 装饰器组件
// function Wrapper(Comp) {
// 	class WrapperComp extends React.Component {
// 		render() {
// 			return(
// 				<div>
// 					<p>这里是加了装饰器组件后的高阶组件</p>
// 					<Comp {...this.props}></Comp>
// 				</div>
// 			)
// 		}
// 	}
// 	return WrapperComp
// }


// 基础组件
// @Wrapper
// class Hello extends React.Component {
// 	render() {
// 		return(
// 			<div>
// 				<h1>这里是基础组件</h1>
// 			</div>
// 		)
// 	}
// }

// Hello = Wrapper(Hello)

@connect(
	state => state.user,
	{ login }
)
@WrapperForm
class Login extends React.Component{
	constructor(props) {
		super(props)
		// this.state = {
		// 	user:'',
		// 	pwd:''
		// }
		this.handleLogin = this.handleLogin.bind(this)
		this.handleRegister = this.handleRegister.bind(this)
	}
	// handleChange(key,val) {
	// 	this.setState({
	// 		[key]:val
	// 	})
	// }
	componentDidMount() {
		// axios.get('http://localhost:3000/data/read?type=it').then((res) => {
		// 	console.log(res)
		// })
	}
	handleLogin() {
		this.props.login(this.props.state)
	}
	handleRegister() {
		this.props.history.push('/register')
	}
	render(){
		return (
			<div>
				<Logo></Logo>
				{(this.props.redirectTo && this.props.redirectTo !== '/login') ? <Redirect to={this.props.redirectTo} /> : null}
				<WingBlank>
					<List>
						<p className="error-msg">{this.props.msg ? this.props.msg : ''}</p>
						<InputItem
							onChange={v=>this.props.handleChange('user',v)}
						>用户</InputItem>
						<WhiteSpace />
						<InputItem
							onChange={v=>this.props.handleChange('pwd',v)}
							type="password"
						>密码</InputItem>
					</List>
					<WhiteSpace />
					<Button onClick={this.handleLogin} type='primary'>登录</Button>
					<WhiteSpace />
					<Button type='primary' onClick={this.handleRegister}>注册</Button>
				</WingBlank>
			</div>
		)
	}
}

export default Login