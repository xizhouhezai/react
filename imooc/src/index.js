import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'
import reducers from './demo/reducer'
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import Auth from './auth';

const store = createStore(reducers)
const notfound = () => {
  return (
    <h1>NOT FOUND</h1>
  )
}

ReactDOM.render((<Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={App} />
        <Route path='/login' component={Auth} />
        <Route psth='/notfound' component={notfound}></Route>
        <Redirect to='/notfound' />
      </Switch>
    </BrowserRouter>
  </Provider>), document.getElementById('root'));

registerServiceWorker();
