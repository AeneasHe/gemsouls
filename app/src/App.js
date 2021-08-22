import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Menu from "./components/Menu";

import Home from "./views/Home";
import Chatroom from './views/Chatroom';
import UserLogin from './views/user/login';
import UserProfile from './views/user';

import { useState, useEffect } from 'react'
import useStorage from './hooks/useStorage'


function App() {
  const { getToken } = useStorage()

  const [token, setToken] = useState(null)

  useEffect(() => {
    setToken(getToken())
  }, [setToken, getToken])

  return (
    <div>
      <Menu />
      {
        token ?

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
          </Router> :
          <UserLogin />
      }
    </div>
  );
}

export default App;
