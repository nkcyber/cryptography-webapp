import React, { useState } from 'react';
import { withRouter } from "react-router";
import Navbar from 'react-bootstrap/Navbar'
import { Button } from 'react-bootstrap/'
import * as crypto from './crypto-functions.js'
import IOFields from './IOFields'
import * as ui from './ui-functions.js'

const GenericCipher = (props) => {
  const input = ui.fetchBuffer(props, 'input')
  const output = ui.fetchBuffer(props, 'output')
  const keyA = ui.fetchBuffer(props, 'keyA')
  const keyM = ui.fetchBuffer(props, 'keyM')
  return (
    <>
      <h4>Affine Cipher</h4>
      <IOFields
        input={input}
        output={output}
        encryptionFn={() => props.onBufferUpdate('output', crypto.affineEncrypt(input, keyM, keyA), props.options.global)}
        decryptionFn={() => props.onBufferUpdate('output', crypto.affineDecrypt(input, keyM, keyA), props.options.global)}
        onInputChange={(e) => props.onBufferUpdate('input', e.target.value, props.options.global)}
        onOutputChange={(e) => props.onBufferUpdate('output', e.target.value, props.options.global)}
      />
      <br/>
      <div style={{display: "flex", flexWrap: 'wrap'}}>
        <div style={{marginLeft: 'auto', marginRight: 'auto'}}>
          <label className="text-left">A:</label>
          <input type="number" value={keyA} name="key" onChange={(e) => props.onBufferUpdate('keyA', e.target.value, props.options.global)}/>
        </div>
        <div style={{marginLeft: 'auto', marginRight: 'auto'}}>
          <label className="text-left">M:</label>
          <input type="number" value={keyM} name="key" onChange={(e) => props.onBufferUpdate('keyM', e.target.value, props.options.global)}/>
        </div>
      </div>
    </>
  );
};

export default withRouter(GenericCipher);
