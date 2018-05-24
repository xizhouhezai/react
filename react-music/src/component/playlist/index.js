import React from 'react'
import axios from 'axios'

import {
  Grid
} from "antd-mobile";

class Playlist extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentWillMount() {
    axios.get('http://localhost:9000/playlist?limit=20').then(res => {
      if (res.status === 200) {
        this.setState({
          data: res.data.playlists
        })
      }
    })
  }
  render() {
    const result = this.state.data ? Array.from(this.state.data).map((_val) => ({
      icon: _val.coverImgUrl,
      text: _val.name,
      id: _val.id
    })) : null
    return (
      <div>
        <Grid
          data = {result}
          columnNum = {2}
          renderItem = {dataItem => (
              <div
                onClick={() => {
                  this.props.history.push(`/detail/${dataItem.id}`)
                }}
                style={{padding: '10px'}}
              >
                <img src = {dataItem.icon}
                  style = {{
                    width: '75%',
                    height: '75%'
                  }} alt = "" />
                <div style = {{
                  color: '#888',
                  fontSize: '14px',
                  marginTop: '12px'
                }} >
                  <span>{dataItem.text}</span>
                </div>
              </div>
            )}
        />
      </div>
    )
  }
}

export default Playlist