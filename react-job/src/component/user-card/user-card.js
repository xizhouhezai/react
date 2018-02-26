import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

@withRouter
class UserCard extends Component {
  static propTypes = {
    userlist: PropTypes.array
  }
  render() {
    return (
      <WingBlank>
        {
          this.props.userlist ? this.props.userlist.map(v => {
            return v.avatar ? (
              <div key={v._id}>
                <WhiteSpace />
                <Card onClick={() => {this.props.history.push(`/chat/${v.user}`)}}>
                  <Card.Header
                    title={v.user}
                    thumb={require(`../../common/images/${v.avatar}.png`)}
                    extra={<span>{v.title}</span>}
                  >
                  </Card.Header>
                  <Card.Body>
                    <div>
                      {
                          v.type === 'boss' ? 
                            (<div><b>公司：</b>{v.company}</div>) : null
                      }
                    </div>
                    <b style={{display: 'inline-block',marginTop: 5}}>{v.type === 'boss' ? '职位要求：' : '我的简介：'}</b>
                    {v.desc.split('\n').map((val, index) => {
                      return (
                        <div style={{textIndent: 15}} key={index}>{val}</div>
                      )
                    })}
                    <div>
                      {
                          v.type === 'boss' ? 
                            (<div style={{marginTop: 5}}><b>薪资：</b>{v.money}</div>) : null
                      }
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ) : null
          }) : null
        }
      </WingBlank>
    )
  }
}

export default UserCard