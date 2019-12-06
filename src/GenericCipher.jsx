import React, { useState } from 'react';
import { withRouter } from "react-router";
import Navbar from 'react-bootstrap/Navbar'
import { Button } from 'react-bootstrap/'
import * as ui from './ui-functions.js'
import IOFields from './IOFields'

const GenericCipher = (props) => {
  const input = ui.fetchBuffer(props, 'input')
  const output = ui.fetchBuffer(props, 'output')
  const key = ui.fetchBuffer(props, 'key')
  return (
    <>
      <h4>{props.title}</h4>
      <IOFields
        input={input}
        output={output}
        encryptionFn={() => props.onBufferUpdate('output', props.encryptionFn(input, key), props.options.global)}
        decryptionFn={() => props.onBufferUpdate('output', props.decryptionFn(input, key), props.options.global)}
        onInputChange={(e) => props.onBufferUpdate('input', e.target.value, props.options.global)}
        onOutputChange={(e) => props.onBufferUpdate('output', e.target.value, props.options.global)}
      />
      <p className="text-left">Key:</p>
      <input size="100" type="text" value={key} name="key" onChange={(e) => props.onBufferUpdate('key', e.target.value, props.options.global)} style={{width: "100%"}}/>
    </>
  );
};

export default withRouter(GenericCipher);
