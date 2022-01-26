import React, { Component } from 'react';
import './App.css';
import Auth from './auth/Auth';
import SiteBar from './home/Navbar';
import Splash from './home/Splash';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      sessionToken: ''
    }
  }

  componentWillMount() {
    const token = localStorage.getItem('token');
    if (token && !this.state.sessionToken) {
      this.setState({ sessionToken: token })
    }
  }

  setSessionState = (token) => {
    localStorage.setItem('token', token);
    this.setState({ sessionToken: token });
  }

  logout = () => {
    this.setState({ sessionToken: '' });
    localStorage.clear();
  }

  // toggleLoginSignup = () => { // toggleLoginSignup initialized here
  //   (loginSignup) ?
  //     setLoginSignup(false) :
  //     setLoginSignup(true)
  // }

  protectedViews = () => {
    if (this.state.sessionToken === localStorage.getItem('token')) {
      return (
        <Switch>
          <Route path='/' exact>
            <Splash token={this.state.sessionToken} />
          </Route>
        </Switch>
      )
    } else {
      return (
        <Switch>
          <Route path='/' exact>
            <Auth setToken={this.setSessionState} />
            <Splash token={this.state.sessionToken} />
          </Route>
        </Switch>
      )
    }
  }

  render() {
      return (
        <Router>
          <div>
            <SiteBar sessionToken={this.state.sessionToken} clickLogout={this.logout} />
            {this.protectedViews()}
          </div>
        </Router>
      )
  }
}

export default App;
