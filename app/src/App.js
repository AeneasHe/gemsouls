import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./views/Home";
import Chatroom from './views/Chatroom';

function App() {
  return (
    <Router>
      <Switch>

        <Route path="/chatroom">
          <Chatroom />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
