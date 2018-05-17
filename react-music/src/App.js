import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Playlist from './component/playlist'
import PlaylistDetail from './component/playlist-detail'
import AuthRoute from './authRoute.js'

class App extends Component {
  render() {
    return (
      <BrowserRouter className="App">
        <div>
          <Route path='/' component={AuthRoute}></Route>
          <Route path='/playlist' component={Playlist}></Route>
          <Route path='/detail/:id' component={PlaylistDetail}></Route>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
