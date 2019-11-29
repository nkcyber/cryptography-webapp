import React, { useState } from 'react';
import { withRouter } from "react-router";
import Navbar from 'react-bootstrap/Navbar'
import { Button } from 'react-bootstrap/'
import * as crypto from './crypto-functions.js'
import * as ui from './ui-functions.js'

const GenericCipher = (props) => {
  const encryption = ui.fetchBuffer(props, 'encryption')
  const decryption = ui.fetchBuffer(props, 'decryption')
  const keyA = ui.fetchBuffer(props, 'keyA')
  const keyM = ui.fetchBuffer(props, 'keyM')
  return (
    <>
      <p className="text-left">Encryption Buffer:</p>
      <textarea rows="6" cols="100" type="textarea" value={encryption} name="encryption" onChange={(e) => props.onBufferUpdate('encryption', e.target.value, props.options.global)}/>
      <br/>
      <Button
        block
        onClick={() => props.onBufferUpdate('decryption', crypto.affineEncrypt(encryption, keyM, keyA), props.options.global)}
      >
        Encrypt
      </Button>
      <p className="text-left">Decryption Buffer:</p>
      <textarea rows="6" cols="100" type="textarea" value={decryption} name="decryption" onChange={(e) => props.onBufferUpdate('decryption', e.target.value, props.options.global)}/>
      <br/>
      <Button
        block
        onClick={() => props.onBufferUpdate('encryption', crypto.affineDecrypt(decryption, keyM, keyA), props.options.global)}
      >
        Decrypt
      </Button>
      <p className="text-left">A:</p>
      <input size="100" type="text" value={keyA} name="key" onChange={(e) => props.onBufferUpdate('keyA', e.target.value, props.options.global)}/>
      <p className="text-left">M:</p>
      <input size="100" type="text" value={keyM} name="key" onChange={(e) => props.onBufferUpdate('keyM', e.target.value, props.options.global)}/>
    </>
  );
};

export default withRouter(GenericCipher);
