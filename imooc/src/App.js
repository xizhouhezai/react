import React, { Component } from 'react';
import { Button, List } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as actions from './demo/action.js' 

class App extends Component {
  render () {
    let boss = '李云龙'
    const app = (
      <div>
        <Button type="primary" onClick={this.props.logout}>登出</Button>
        <h1>团长：{boss}</h1>
        <YiYing />
      </div>
    )
    return this.props.isAuth ? app : <Redirect to='/login' />
  }
}
class YiYing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      solders: ['柱子', '虎子', '和尚']
    }
  }
  addSolder = () => {
    this.setState({
      solders: [...this.state.solders, '新兵蛋子' + Math.random()]
    })
  }
  render () {
    let boss = '意大利炮'
    return (
      <div>
        <h1>一营营长：{boss}</h1>
        <Button type="primary" onClick={this.addSolder}>新兵入伍</Button>
        <h3>士兵：</h3>
        <List renderHeader={() => '士兵列表'}>
          {this.state.solders.map(v => {
            return(
              <List.Item key={v}>{v}</List.Item>
            )
          })}
        </List>
        <h3>机枪有{this.props.num}把</h3>
        <Button type="primary" onClick={() => {
          this.props.addGun()
        }}>申请机枪</Button>
        <Button type="primary" onClick={() => {
          this.props.removeGun()
        }}>上交机枪</Button>
      </div>
    )
  }
}

const mapStatetoProps = (state) => {
  return {num: state.counter}
}
const actionCreator = {...actions}
YiYing = connect(mapStatetoProps, actionCreator)(YiYing)

App = connect(
  (state) => {return state.logn},
  {...actions}
)(App)

export default App;
