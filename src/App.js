import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import configurationStore from './store';
import Auth from './layouts/Auth';
import Chat from './layouts/Chat';

const store = configurationStore();
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/auth/login" exact component={Auth} />
            <Route path="/chat" exact component={Chat} />
            <Route path="/chat/:id" component={Chat} />
            <Redirect from="/" to="/auth/login" />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
