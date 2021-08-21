import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Menu from "./components/Menu";

import Home from "./views/Home";
import Chatroom from './views/Chatroom';
import UserLogin from './views/user/login';
import UserProfile from './views/user';

function App() {
  return (
    <div>
      <Menu />
      <Router>
        <Switch>

          <Route path="/chatroom">
            <Chatroom />
          </Route>

          <Route path="/user/login">
            <UserLogin />
          </Route>
          <Route path="/user">
            <UserProfile />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
