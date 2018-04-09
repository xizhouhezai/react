import React,{ Component } from 'react'
// import PropTypes from 'prop-types'
// import { addgun, minusgun } from '../redux/reducer';
import { connect } from '../redux/react-redux'
import { addgun, minusgun } from '../redux/reducer'

class Demo extends Component {
  componentDidMount() {
  }
  render () {
    return (
      <div>
        <h3>现在有{this.props.num}把机枪</h3>
        <button onClick={() => {
          this.props.addgun()
        }}>申请一把机枪</button>
        <button onClick={() => {
          this.props.minusgun()
        }}>减少一把机枪</button>
      </div>
    )
  }
}

Demo = connect(
  state => state,
  { addgun, minusgun }
)(Demo)

export default Demo