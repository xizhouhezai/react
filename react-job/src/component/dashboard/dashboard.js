import React, { Component } from 'react'
import { Route } from 'react-router-dom'

function Boss() {
  return <h1>Boss</h1>
}

class Dashboard extends Component {
  render() {
    return(
      <div>
        <header>头部导航</header>
        <Route path="/boss" component={ Boss }/>
        <footer>底部tab栏</footer>
      </div>
    )
  }
}

export default Dashboard