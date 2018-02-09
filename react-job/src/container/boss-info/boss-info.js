import React,{ Component } from 'react'
import { NavBar, WingBlank, WhiteSpace, InputItem, TextareaItem, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { update } from '../../redux/user.redux'

import AvatarSelector from '../../component/avatar-selector/avatar-selector'

@connect(
  state => state.user,
  { update }
)
class BossInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      company: '',
      money: '',
      desc: '',
      avatar: ''
    }
  }
  onChange(key, val) {
    this.setState({
      [key]: val
    })
  }
  render() {
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return(
      <div className="bossinfo">
        {(redirect && redirect !== path) ? <Redirect to={this.props.redirectTo} /> : null}
        <NavBar mode="dark" >Boss信息完善</NavBar>
        <AvatarSelector selectItem={(val) => {
          this.setState({
            avatar: val
          })
        }}></AvatarSelector>
        <WhiteSpace />
        <WingBlank>
          <p className="error-msg">{this.props.msg ? this.props.msg : ''}</p>
          <InputItem
            onChange={(v) => this.onChange('title', v)}
          >招聘职位</InputItem>
          <InputItem
            onChange={(v) => this.onChange('company', v)}
          >公司名称</InputItem>
          <InputItem
            onChange={(v) => this.onChange('money', v)}
          >职位薪资</InputItem>
          <TextareaItem 
            title='职位要求'
            onChange={(v) => this.onChange('desc', v)}
            rows={3}
            autoHeight
          />
          <WhiteSpace />
          <Button onClick={() => {
            this.props.update(this.state)
          }}
            type="primary"
          >保存</Button>
        </WingBlank>
      </div>
    )
  }
}

export default BossInfo