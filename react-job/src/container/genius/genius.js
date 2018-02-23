import React, { Component } from 'react'
import axios from 'axios'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'

class Genius extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null
    }
  }
  componentDidMount() {
    axios.get('user/list?type=boss')
      .then((res) => {
        if (res.data.code === 0) {
          this.setState({
            data: res.data.data
          })
        }
      })
  }
  render() {
    console.log(this.state.data)
    return (
      <WingBlank>
        {
          this.state.data ? this.state.data.map(v => {
            return v.avatar ? (
              <div key={v._id}>
                <WhiteSpace />
                <Card>
                  <Card.Header
                    title={v.user}
                    thumb={require(`../../common/images/${v.avatar}.png`)}
                    extra={<span>{v.title}</span>}
                  >
                  </Card.Header>
                  <Card.Body>
                    {v.desc.split('\n').map((val, index) => {
                      return (
                        <div key={index}>{val}</div>
                      )
                    })}
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

export default Genius