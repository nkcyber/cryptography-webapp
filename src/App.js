import React, { Component } from 'react';
import {  withRouter,
          Switch,
          Redirect,
          Route } from "react-router";
import { withLayout } from "./layout"
import GenericCipher from "./GenericCipher"
import { produce } from 'immer';
import logo from './logo.svg';
import './App.css';
import * as crypto from './crypto-functions.js'


class App extends Component {
  constructor() {
    super();
    this.state = {
      buffers: {'global.encryption': ""},
      options: {},
    };
    this.onBufferUpdate = this.onBufferUpdate.bind(this);
  }

  onBufferUpdate(bufferName, contents, global=false) {
    this.setState(produce((draft) => {
      if (global) {
        draft.buffers[`global.${bufferName}`] = contents
      } else {
        draft.buffers[`${this.props.location.pathname}.${bufferName}`] = contents
      }
    }));
  }

  render() {
    return (
      <div className="App">
        <Route exact path="/">
          <Redirect to="/caesar-cipher"/>
        </Route>
        <Switch>
          <Route path="/caesar-cipher">
            <GenericCipher
              buffers={this.state.buffers}
              options={this.state.options}
              onBufferUpdate={this.onBufferUpdate}
              encryptionFn={(str, key) => crypto.additive(str, key)}
              decryptionFn={(str) => str.toLowerCase()}
            />
          </Route>
          <Route path="/frequency-analysis">
            <p></p>
          </Route>
          <Route path="/multiplicative-cipher">
            <GenericCipher
              buffers={this.state.buffers}
              options={this.state.options}
              onBufferUpdate={this.onBufferUpdate}
              encryptionFn={(str, key) => crypto.multiplicativeEncrypt(str, key)}
              decryptionFn={(str, key) => crypto.multiplicativeDecrypt(str, key)}
            />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(withLayout(App));
