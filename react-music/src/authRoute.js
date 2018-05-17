import React from 'react'

class AuthRoute extends React.Component {
  componentDidMount() {
    this.props.history.push('/playlist')
  }
  render() {
    return null
  }
}

export default AuthRoute