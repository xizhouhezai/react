import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from './xi-redux'
import { counter } from './redux/reducer'
import Provider from './redux/react-redux'

const store = createStore(counter)

ReactDOM.render(<Provider store={store}>
  <App /></Provider>, document.getElementById('root'));
registerServiceWorker();
