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
      <div className="fixed top-0 left-0 right-0 z-40">
        <Menu />
      </div>
      <div className="absolute top-20 inset-x-0  z-10 ">
        <div className="container mx-auto w-6/12">
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
      </div>
    </div>
  );
}

export default App;
