import React,{ Component } from 'react'
import PropTypes from 'prop-types'
import {Grid, List} from 'antd-mobile'
import axios from 'axios'

class AvatarSelector extends Component{
  constructor(props) {
    super(props)
    this.state = {
      Img: []
    }
  }
  componentDidMount() {
    axios.get('/user/avatar').then((res) => {
      const Img = JSON.parse(res.data)
      this.setState({
        Img: Img
      })
    })
  }
  render() {
    const avatarList = this.state.Img ? this.state.Img.map(v => ({
        icon: require('../../common/images/' + v.imgPath),
        text: v.imgName})
    ) : null
    const gridHeader = this.state.icon ? (
      <div>
        <span style={{display: 'inline-block', marginRight: 5}}>已选择头像</span>
        <img style={{width: 20}} src={this.state.icon} alt="" />
      </div>
    ) : '请选择头像'
    return(
      <div className="avatar">
        <List renderHeader={() => gridHeader}>
          <Grid
            data={avatarList}
            columnNum={5}
            onClick={(ele) => {
              this.setState(ele)
              this.props.selectItem(ele.text)
            }}
          />
        </List>
      </div>
    )
  }
}

AvatarSelector.propTypes = {
  selectItem: PropTypes.func
}

export default AvatarSelector