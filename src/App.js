import React, { Component } from 'react';
import {  withRouter,
          Redirect,
          Route } from "react-router";
import { withLayout } from "./layout"
import logo from './logo.svg';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/">
          <Redirect to="/caesar-cipher"/>
        </Route>
      </div>
    );
  }
}

export default withRouter(withLayout(App));
