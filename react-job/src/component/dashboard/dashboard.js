import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import { connect } from 'react-redux'

import NavLink from '../nav-link/nav-link'
import Boss from '../../container/boss/boss'
import Genius from '../../container/genius/genius'

function Msg() {
  return <h1>Msg</h1>
}
function User() {
  return <h1>User</h1>
}

@connect(
  state=>state
)
class Dashboard extends Component {
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
    return(
      <div>
        <NavBar mode='dark' className='fixd-header'>
          {
            pathname !== '/' ? navlist.find(v=>v.path===pathname).title : ''
          }
        </NavBar>
        <div style={{marginTop:45}}>
          <Switch>
            <Route path="/boss" component={ Boss }/>
            <Route path="/genius" component={ Genius }/>
            <Route path="/msg" component={ Msg }/>
            <Route path="/me" component={ User }/>
          </Switch>
        </div>
        <NavLink navlist={navlist}></NavLink>
      </div>
    )
  }
}

export default Dashboard