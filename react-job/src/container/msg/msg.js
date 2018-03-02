import React, { Component } from 'react'
import { connect } from 'react-redux'

@connect(
  state => state
)
class Msg extends Component {
  render() {
    console.log(this.props)
    const msgGroup = {}
    this.props.chat.chatmsg.forEach(v=>{
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
      console.log(msgGroup)
    return (
      <div className="msg">
        Msg      
      </div>
    )
  }
}

export default Msg