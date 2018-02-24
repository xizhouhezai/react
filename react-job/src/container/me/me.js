import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import Cookies from 'browser-cookies'
import { Redirect } from 'react-router-dom'
import { logoutSubmit } from '../../redux/user.redux'

@connect(
  state => state,
  { logoutSubmit }
)
class Me extends Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }
  logout() {
    const alert = Modal.alert
    alert(
      '注销',
      '确认退出登录吗？',
      [
        {text: '取消', onPress: () => console.log('取消')},
        {text: '确认', onPress: () => {
          Cookies.erase('userid')
          this.props.logoutSubmit()
        }},
      ]
    )
  }
  render() {
    const user = this.props.user
    return (
      <div className="me">
        {user.avatar ? 
          <div>
            <Result
              img={<img style={{width: 60}} src={require(`../../common/images/${user.avatar}.png`)} alt={user.avatar} />}
              title={user.user}
              message={user.type === 'boss' ? user.company : null}
            ></Result>
            <List renderHeader={() => '简介'}>
              <List.Item>
                {user.title}
                {user.desc.split('\n').map((v, i) => {
                  return (
                    <List.Item.Brief key={i}>{v}</List.Item.Brief>
                  )
                })}
                {user.money ? <List.Item.Brief>薪资：{user.money}</List.Item.Brief> : null}
              </List.Item>
            </List>
            <WhiteSpace />
            <List>
              <List.Item onClick={this.logout}>退出登录</List.Item>
            </List>
          </div> : <Redirect to={this.props.user.redirectTo} />}
      </div>
    )
  }
}

export default Me