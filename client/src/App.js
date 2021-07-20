import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Login from "./comp/auth/Login";
import PrivateRoute from "./comp/private-route/PrivateRoute";
import AdminLayout from "./layouts/Admin.jsx";
import "./assets/scss/material-dashboard-pro-react.scss?v=1.8.0";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
			      <Redirect from="/" to="/login"/>
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute path="/admin/dashboard" component={AdminLayout} />
              <PrivateRoute path="/admin/dashboard2" component={AdminLayout} />
              <PrivateRoute path="/admin/traffic" component={AdminLayout} />
              <PrivateRoute path="/admin/table" component={AdminLayout} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
