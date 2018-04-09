import React, { Component } from 'react';
import './App.css';
import './redux-demo'
import Demo from './demo/demo.1'
import Page from './demo/demo-context'

class App extends Component {
  componentDidMount() {
  }
  render() {
    return (
      <div className="App">
        <Demo />
        <Page />
      </div>
    );
  }
}

export default App;
