import React from 'react'
import { connect } from 'react-redux'
import { Button, List } from 'antd-mobile'
import { Redirect } from 'react-router-dom'
import { login } from './demo/action.js'
import { getUserData } from './demo/reducer'

class Auth extends React.Component {
  componentDidMount() {
    this.props.getUserData()
  }
  render() {
    const auth = (
      <div>
        <h3>没有权限，请登录</h3>
        <List renderHeader={() => '产品列表'}>
        {this.props.payload ? this.props.payload.result.list[0].cartList.map(v => {
          console.log(v.productName)
          return(
            <List.Item key={v.productId}>{v.productName}</List.Item>
          )
        }) : ''}
        </List>
        <Button type="primary" onClick={this.props.login}>登录</Button>
      </div>
    )
    return this.props.isAuth ? <Redirect to='/' /> : auth
  }
}

Auth = connect(
  state=>state.logn,
  {login, getUserData}
)(Auth)

export default Auth