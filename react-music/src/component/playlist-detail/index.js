import React from 'react'
import axios from 'axios'

import { Card, List } from 'antd-mobile'

class PlaylistDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      result: [],
      creator: null,
      tracks: []
    }
  }
  componentDidMount() {
    const { match } = this.props
    axios.get('http://localhost:9000/playlist/detail', {
      params: {
        id: match.params.id
      }
    }).then(res => {
      if (res.status === 200) {
        console.log(res.data)
        this.setState({
          result: res.data.result,
          creator: res.data.result.creator,
          tracks: res.data.result.tracks
        })
      }
    })
  }
  render() {
    return (
      <div className="detail">
        {
          this.state.result ? <Card>
            <Card.Header
              thumb={this.state.result.coverImgUrl}
              extra={<div>
                  <h3>{this.state.result.name}</h3>
                  <p style={{height: '40px', textAlign: 'left', lineHeight: '40px'}}>
                    <img 
                      style={{width: '40px', height: '40px', borderRadius: '50%', float: 'left', margin: '0 7px 0 20px'}}
                      src={this.state.creator ? this.state.creator.avatarUrl : ''} 
                      alt='' 
                    />
                    {this.state.creator ? this.state.creator.nickname : ''}
                  </p>
                </div>}
            />
            <Card.Body>
              <div>{this.state.result.description}</div>
            </Card.Body>
          </Card> : null
        }
        {
          this.state.tracks ? <List>
            {
              this.state.tracks.map((val, i) => {
                return (
                  <List.Item
                    key={i}
                    thumb={val.album.picUrl}
                  >
                    {val.name}
                    <List.Item.Brief>
                    {val.artists[0].name}
                    </List.Item.Brief>
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

export default PlaylistDetail