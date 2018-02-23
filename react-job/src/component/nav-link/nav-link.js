import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

@withRouter
class NavLink extends Component {
  static propTypes = {
    navlist: PropTypes.array
  }
  render() {
    const navlist = this.props.navlist.filter(v => !v.hide)
    const { pathname } = this.props.location
    return(
      <div className="navlink">
        <TabBar>
          {
            navlist.map(v => {
              return (
                <TabBar.Item
                  key={v.path}
                  title={v.text}
                  icon={<div style={{width: 22, height: 22}}>
                    <i ref="icon" className={"iconfont " + v.icon}></i>
                  </div>}
                  selectedIcon={<div style={{width: 22, height: 22}}>
                    <i ref="icon" className={"iconfont " + v.icon + " icon-active"}></i>
                  </div>}
                  selected={pathname===v.path}
                  onPress={()=>{
                    this.props.history.push(v.path)
                  }}
                ></TabBar.Item>
              )
            })
          }
        </TabBar>
      </div>
    )
  }
}

export default NavLink