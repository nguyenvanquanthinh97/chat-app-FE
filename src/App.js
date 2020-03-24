import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Auth from './layouts/Auth';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route to="/" exact component={Auth} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
