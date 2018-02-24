import React from 'react'
import { Redirect } from 'react-router-dom'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux'
import Logo from '../../component/logo/logo'

@connect(
	state => state.user,
	{ login }
)
class Login extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			user:'',
			pwd:''
		}
		this.handleLogin = this.handleLogin.bind(this)
		this.handleRegister = this.handleRegister.bind(this)
	}
	handleChange(key,val) {
		this.setState({
			[key]:val
		})
	}
	handleLogin() {
		this.props.login(this.state)
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
							onChange={v=>this.handleChange('user',v)}
						>用户</InputItem>
						<WhiteSpace />
						<InputItem
							onChange={v=>this.handleChange('pwd',v)}
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