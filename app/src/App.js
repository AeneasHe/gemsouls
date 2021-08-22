import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Menu from "./components/Menu";

import Home from "./views/Home";
import Chatroom from './views/Chatroom';

import UserProfile from './views/user';

import UserRegister from './views/user/register';
import UserLogin from './views/user/login';
import UserLogout from './views/user/logout';

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



              <Route path="/user/logout">
                <UserLogout />
              </Route>

              <Route path="/user">
                <UserProfile />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Router> :
          <>
            <Router>
              <Switch>

                <Route path="/user/register">
                  <UserRegister />
                </Route>

                <Route path="/user/login">
                  <UserLogin />
                </Route>

              </Switch>
            </Router>

          </>
      }
    </div>
  );
}

export default App;
