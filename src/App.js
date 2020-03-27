import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Auth from './layouts/Auth';
import Chat from './layouts/Chat';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Auth} />
          <Route path="/chat/:id" exact component={Chat} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
