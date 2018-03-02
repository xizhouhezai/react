import React, { Component } from 'react'
import { List, InputItem } from 'antd-mobile'
import { connect } from 'react-redux'
import { NavBar, Icon, WingBlank } from 'antd-mobile'

import { getMsgList, sendMsg, getRecvMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util/util'
import Emoji from '../../component/emoji/emoji'

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
      msg: [],
      isShow: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
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
    const userid = this.props.match.params.user
    if (!this.props.chat.users[userid]) {
      return null
    }
    const chatid = getChatId(this.props.user._id, userid)
    const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid === chatid)
    return (
      <div className="chat">
        <NavBar
          mode="dark"
          className="fixd-header"
          leftContent={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
        >
          {
            this.props.chat.users[userid] ? this.props.chat.users[userid].name : null
          }
        </NavBar>
        <WingBlank>
          <div style={{marginTop: 60, marginBottom: 60}}>
            {
              this.props.chat ? chatmsgs.map((v, i) => {
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
                            <img src={require('../../common/images/' + this.props.chat.users[userid].avatar + '.png')} alt={this.props.chat.users[userid].avatar}/>
                          </div>
                          <span>{this.props.chat.users[userid].name}</span>
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
        </WingBlank>
        
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
                <div>
                  <span style={{marginRight: 15, fontSize: 20}}
                    onClick={() => {this.setState({isShow: !this.state.isShow})}}
                  >😃</span>
                  <span onClick={this.handleSubmit}>发送</span>
                </div>
              }
            />
          </List>
          {
            this.state.isShow ? <Emoji
              selectEmoji={
                (el) => {
                  console.log(el)
                  this.setState({text: this.state.text + el.text})
                }
              }
            ></Emoji> : null
          }
        </div>
      </div>
    )
  }
}

export default Chat