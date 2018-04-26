import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import { addgun, minusgun } from '../redux/reducer';
import { connect } from '../redux/react-redux'
import { addgun, minusgun } from '../redux/reducer'
import PropTypes from 'prop-types'

class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func
  }
  render() {
    return (
      <div>
        <button onClick={this.props.onClick}>按钮</button>
      </div>
    )
  }
}

class Demo extends Component {
  // constructor(props) {
  //   super(props)
    // this.handleChange = this.handleChange.bind(this)
  // }
  componentDidMount() {
  }
  handleChange(e) {
    console.log(e.target.value)
  }
  debounce(func, delay) {
    let timer
    return function (...args) {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(function () {
        func.apply(this, args)
      }, delay)
    }
  }
  render() {
    return (
      <div>
        <h3>现在有{this.props.num}把机枪</h3>
        <button onClick={() => {
          this.props.addgun()
        }}>申请一把机枪</button>
        <button onClick={() => {
          this.props.minusgun()
        }}>减少一把机枪</button>
        <Button onClick={(v) => { console.log(v) }}></Button>
        <input type="text" onChange={(e) => { this.debounce(this.handleChange(e), 2000) }} />
      </div>
    )
  }
}

Demo = connect(
  state => state,
  { addgun, minusgun }
)(Demo)

export default Demo