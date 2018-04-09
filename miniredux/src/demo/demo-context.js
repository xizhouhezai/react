import React from 'react'
import PropTypes from 'prop-types'

class Navbar extends React.Component {
  render() {
    return (
      <div>
        <h1>Navbar{}</h1>
        <Slider></Slider>
      </div>
    )
  }
}

class Slider extends React.Component {
  static contextTypes = {
    user: PropTypes.string
  }
  render() {
    console.log(this.context)
    return (
      <div>
        <h1>Slider</h1>
      </div>
    )
  }
}

class Page extends React.Component {
  static childContextTypes = {
    user: PropTypes.string
  }
  constructor(props) {
    super(props)
    this.state = { user: '大饼'}
  }
  getChildContext() {
    return this.state
  }
  render() {
    return (
      <div>
        <h1>我是{this.state.user}</h1>
        <Navbar />
      </div>
    )
  }
}

export default Page