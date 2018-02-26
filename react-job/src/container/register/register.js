import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem,Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import WrapperForm from '../../component/imooc-form/imooc-form'

@connect(
	state=>state.user,
	{register}
)
@WrapperForm
class Register extends React.Component{
	constructor(props) {
		super(props)
		// this.state = {
		// 	user:'',
		// 	pwd:'',
		// 	repeatpwd:'',
		// 	type:'genius' // 或者boss
		// }

		this.handleRegister = this.handleRegister.bind(this)
	}
	// handleChange(key,val){
	// 	this.setState({
	// 		[key]:val
	// 	})
	// }
	handleRegister(){
		this.props.register(this.props.state)
	}
	componentDidMount() {
		console.log(this.props.msg)
		this.props.handleChange('type','genius')
		// if (this.props.msg) {
		// 	this.props.register(this.props.state)
		// }
	}
	render(){
		const RadioItem = Radio.RadioItem
		return (
			<div>
				<Logo></Logo>
				{this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
				<WingBlank>
					<List>
						<p className="error-msg">{this.props.msg ? this.props.msg : ''}</p>
						<InputItem
							onChange={v=>this.props.handleChange('user',v)}
						>用户名</InputItem>
						<WhiteSpace />
						<InputItem
							type='password'
							onChange={v=>this.props.handleChange('pwd',v)}
						>密码</InputItem>
						<WhiteSpace />
						<InputItem
							type='password'
							onChange={v=>this.props.handleChange('repeatpwd',v)}
						>确认密码</InputItem>
						<WhiteSpace />
						<RadioItem
							checked={this.props.state.type==='genius'}
							onChange={()=>this.props.handleChange('type','genius')}
						>
							牛人
						</RadioItem>
						<RadioItem
							checked={this.props.state.type==='boss'}
							onChange={()=>this.props.handleChange('type','boss')}
						>
							BOSS
						</RadioItem>
						<WhiteSpace />
					</List>
					<WhiteSpace />
					<Button type='primary' onClick={this.handleRegister}>注册 </Button>
				</WingBlank>
			</div>
		)
	}
}

export default Register