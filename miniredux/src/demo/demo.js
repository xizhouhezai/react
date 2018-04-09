import React,{ Component } from 'react'
import PropTypes from 'prop-types'
import { addgun, minusgun } from '../redux/reducer';

class Demo extends Component {
  static contextTypes = {
    store: PropTypes.object
  }
  constructor(props) {
    super(props)
    this.state = {num: 0}
  }
  componentDidMount() {
    this.context.store.describe(() => {
      this.setState({
        num: this.context.store.getState()
      })
    })
    console.log(this.context.store.getState())
  }
  render () {
    const { store } = this.context
    return (
      <div>
        <h3>现在有{this.state.num}把机枪</h3>
        <button onClick={() => {
          store.dispatch(addgun())
        }}>申请一把机枪</button>
        <button onClick={() => {
          store.dispatch(minusgun())
        }}>减少一把机枪</button>
      </div>
    )
  }
}

export default Demo