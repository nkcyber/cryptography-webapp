import React, { Component } from 'react';
import {  withRouter,
          Switch,
          Redirect,
          Route } from "react-router";
import { withLayout } from "./layout"
import GenericCipher from "./GenericCipher"
import AffineCipher from "./AffineCipher"
import ColumnarTransposition from "./ColumnarTransposition"
import FrequencyGraph from "./FrequencyGraph"
import { produce } from 'immer';
import logo from './logo.svg';
import './App.css';
import * as crypto from './crypto-functions.js'


class App extends Component {
  constructor() {
    super();
    this.state = {
      buffers: {'global.encryption': ""},
      options: { 'global': true },
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
              encryptionFn={(str, key) => crypto.additiveEncrypt(str, key)}
              decryptionFn={(str, key) => crypto.additiveDecrypt(str, key)}
            />
          </Route>
          <Route path="/frequency-analysis">
            <FrequencyGraph
              buffers={this.state.buffers}
              options={this.state.options}
            />
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
          <Route path="/masc">
            <GenericCipher
              buffers={this.state.buffers}
              options={this.state.options}
              onBufferUpdate={this.onBufferUpdate}
              encryptionFn={(str, key) => crypto.masc(str, key)}
              decryptionFn={(str, key) => crypto.mascDecrypt(str, key)}
            />
          </Route>
          <Route path="/affine-cipher">
            <AffineCipher
              buffers={this.state.buffers}
              options={this.state.options}
              onBufferUpdate={this.onBufferUpdate}
            />
          </Route>
          <Route path="/columnar-transposition">
            <ColumnarTransposition
              buffers={this.state.buffers}
              options={this.state.options}
              onBufferUpdate={this.onBufferUpdate}
            />
          </Route>
          <Route path="/vigenere-cipher">
            <GenericCipher
              buffers={this.state.buffers}
              options={this.state.options}
              onBufferUpdate={this.onBufferUpdate}
              encryptionFn={(str, key) => crypto.vigenereEncrypt(str, key)}
              decryptionFn={(str, key) => crypto.vigenereDecrypt(str, key)}
            />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(withLayout(App));
