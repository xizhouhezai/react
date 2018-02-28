import React, { Component } from 'react'
import { List, InputItem } from 'antd-mobile'
import { connect } from 'react-redux'
import { NavBar, Icon } from 'antd-mobile'

import { getMsgList, sendMsg, getRecvMsg } from '../../redux/chat.redux'

import './chat.css'

@connect(
  state => state,
  { getMsgList, sendMsg, getRecvMsg }
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
    if (!this.props.chat.users) {
      this.props.getRecvMsg()
      this.props.getMsgList()
    }
  }
  handleSubmit() {
    this.props.sendMsg({from: this.props.user._id, to: this.props.match.params.user, msg: this.state.text})
    this.setState({
      text: ''
    })
  }
  render() {
    const user = this.props.match.params.user
    return (
      <div className="chat">
        <NavBar
          mode="dark"
          className="fixd-header"
          leftContent={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
        >
          {
            this.props.chat.users ? this.props.chat.users[user].name : null
          }
        </NavBar>
        <div style={{marginTop: 60}}>
          {
            this.props.chat ? this.props.chat.chatmsg.map((v, i) => {
              return(
                <div key={i}>
                  {v.from === this.props.user._id ? 
                    <div className="chat_right">
                      <div className="chat-fr">
                        <div style={{textAlign: 'center'}}>
                          <img src={require('../../common/images/' + this.props.chat.users[this.props.user._id].avatar + '.png')} alt={this.props.chat.users[this.props.user._id].avatar}/>
                        </div>
                        <span>{this.props.chat.users[this.props.user._id].name}</span>
                      </div>
                      <div className="demo clearfix fr">
                        <span className="triangle right"></span>
                        <div className="article">
                          <span>{v.content}</span>
                        </div>
                      </div>
                    </div>
                    : 
                    <div className="chat_left">
                      <div className="chat-fl">
                        <div style={{textAlign: 'center'}}>
                          <img src={require('../../common/images/' + this.props.chat.users[user].avatar + '.png')} alt={this.props.chat.users[user].avatar}/>
                        </div>
                        <span>{this.props.chat.users[user].name}</span>
                      </div>
                      <div className="demo clearfix">
                        <span className="triangle"></span>
                        <div className="article">
                          <span>{v.content}</span>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              )
            }) : null
          }
        </div>
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