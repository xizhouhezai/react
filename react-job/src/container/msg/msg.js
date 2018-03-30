import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, WhiteSpace, Badge } from 'antd-mobile'

@connect(
  state => state
)
class Msg extends Component {
  render() {
    console.log(this.props)
    const msgGroup = {}
    let chatMsg = this.props.chat.chatmsg ? this.props.chat.chatmsg : []
    const to = chatMsg[chatMsg.length - 1] ? chatMsg[chatMsg.length - 1].to : null
    const from = chatMsg[chatMsg.length - 1] ? chatMsg[chatMsg.length - 1].from : null
    if (to !== this.props.user._id && from !== this.props.user._id) {
      chatMsg.pop()
    }
    chatMsg.forEach(v=>{
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
      const userInfo = Object.values(msgGroup).sort(function(a, b) {
        const a_lastTime = a[a.length-1].create_time
        const b_lastTime = b[b.length-1].create_time
        return b_lastTime - a_lastTime
      })
    return (
      <div className="msg">
        <WhiteSpace />
        {
          this.props.chat ? <List>
            {
              userInfo.map((v, i) => {
                const users = this.props.chat.users
                const targetId = v[0].from === this.props.user._id ? v[0].to : v[0].from
                const name = this.props.user._id === v[v.length-1].to ?
                 users[v[v.length-1].from].name : users[v[v.length-1].to].name
                const avatar = this.props.user._id === v[v.length-1].to ?
                 users[v[v.length-1].from].avatar : users[v[v.length-1].to].avatar
                const unreadNum = v.filter(v => !v.read && this.props.user._id === v.to).length
                return (
                  <List.Item 
                    key={i}
                    extra={<Badge text={unreadNum}></Badge>}
                    thumb={require(`../../common/images/${avatar}.png`)}
                    onClick={() => this.props.history.push(`/chat/${targetId}`)}
                  >
                    {
                      v[v.length-1].content
                    }
                    <List.Item.Brief>{name}</List.Item.Brief>
                  </List.Item>
                )
              })
            }
          </List> : null
        }      
      </div>
    )
  }
}

export default Msg