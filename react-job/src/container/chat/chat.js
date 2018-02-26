import React, { Component } from 'react'
import { List, InputItem } from 'antd-mobile'
import { connect } from 'react-redux'

import { getMsgList } from '../../redux/chat.redux'
import io from 'socket.io-client'
const socket = io('ws://localhost:8888')

@connect(
  state => state,
  { getMsgList }
)
class Chat extends Component{
  constructor(props) {
    super(props)
    this.state={
      text: '',
      msg: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.getMsgList()
    console.log(this.props)
    socket.on('rescMsg', (data) => {
      console.log(data)
      this.setState({
        msg: [...this.state.msg, data.text]
      })
    })
  }
  handleSubmit() {
    socket.emit('sendMsg', {text: this.state.text})
    this.setState({
      text: ''
    })
  }
  render() {
    return (
      <div className="chat">
        <h1>这里是聊天页</h1>
        {
          this.state.msg.map((v, i) => {
            return(
              <p key={i}>{v}</p>
            )
          })
        }
        <div className="stick-footer">
          <List>
            <InputItem 
              placeholder="请输入"
              value={this.state.text}
              onChange={v => {
                this.setState({
                  text: v
                })
              }}
              extra={
                <span onClick={this.handleSubmit}>发送</span>
              }
            />
          </List>
        </div>
      </div>
    )
  }
}

export default Chat