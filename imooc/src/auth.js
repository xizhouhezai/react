import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd-mobile'
import { Redirect } from 'react-router-dom'
import * as actions from './demo/action.js' 

class Auth extends React.Component {
  render() {
    console.log(this.props)
    const auth = (
      <div>
        <h3>没有权限，请登录</h3>
        <Button type="primary" onClick={this.props.login}>登录</Button>
      </div>
    )
    return this.props.isAuth ? <Redirect to='/' /> : auth
  }
}

Auth = connect(
  state=>state.logn,
  {...actions}
)(Auth)

export default Auth