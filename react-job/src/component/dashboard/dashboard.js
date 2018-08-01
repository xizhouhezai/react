import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import { connect } from 'react-redux'

import NavLink from '../nav-link/nav-link'
import Boss from '../../container/boss/boss'
import Genius from '../../container/genius/genius'
import Me from '../../container/me/me'
import Msg from '../../container/msg/msg'

import { getMsgList, getRecvMsg } from '../../redux/chat.redux'

@connect(
  state=>state,
  { getMsgList, getRecvMsg}
)
class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.getRecvMsg()
    }
  }
  render() {
    const user = this.props.user
    const navlist = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'icon-wodedingdan',
        title: '牛人列表',
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'BOSS',
        icon: 'icon-wodedingdan',
        title: 'BOSS列表',
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'icon-xiaoxizhongxin',
        title: '消息列表'
      },
      {
        path: '/me',
        text: '我',
        icon: 'icon-account',
        title: '个人中心'
      }
    ]
    const { pathname } = this.props.location
    if (!navlist.find(v => v.path === pathname)) {
      return null
    }
    return(
      <div>
        <NavBar mode='dark' className='fixd-header'>
          {
            pathname !== '/' ? navlist.find(v=>v.path===pathname).title : ''
          }
        </NavBar>
        <div style={{marginTop:45, marginBottom: 60}}>
          <Switch>
            <Route path="/boss" component={ Boss }/>
            <Route path="/genius" component={ Genius }/>
            <Route path="/msg" component={ Msg }/>
            <Route path="/me" component={ Me }/>
          </Switch>
        </div>
        <NavLink navlist={navlist}></NavLink>
      </div>
    )
  }
}

export default Dashboard