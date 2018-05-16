import React, { Component } from 'react';
import {
  Button
} from 'antd-mobile'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Button type = "primary"> Primary </Button>
        <Button> Default </Button>
        <Button type = "warning"> warning </Button>
      </div>
    );
  }
}

export default App;
