import React, { useState } from 'react';
import { withRouter } from "react-router";
import Navbar from 'react-bootstrap/Navbar'
import { Button } from 'react-bootstrap/'
import * as ui from './ui-functions.js'

const GenericCipher = (props) => {
  const encryption = ui.fetchBuffer(props, 'encryption')
  const decryption = ui.fetchBuffer(props, 'decryption')
  const key = ui.fetchBuffer(props, 'key')
  return (
    <>
      <p className="text-left">Encryption Buffer:</p>
      <textarea rows="6" cols="100" type="textarea" value={encryption} name="encryption" onChange={(e) => props.onBufferUpdate('encryption', e.target.value, props.options.global)}/>
      <br/>
      <Button
        block
        onClick={() => props.onBufferUpdate('decryption', props.encryptionFn(encryption, key), props.options.global)}
      >
        Encrypt
      </Button>
      <p className="text-left">Decryption Buffer:</p>
      <textarea rows="6" cols="100" type="textarea" value={decryption} name="decryption" onChange={(e) => props.onBufferUpdate('decryption', e.target.value, props.options.global)}/>
      <br/>
      <Button
        block
        onClick={() => props.onBufferUpdate('encryption', props.decryptionFn(decryption, key), props.options.global)}
      >
        Decrypt
      </Button>
      <p className="text-left">Key:</p>
      <input size="100" type="text" value={key} name="key" onChange={(e) => props.onBufferUpdate('key', e.target.value, props.options.global)}/>
    </>
  );
};

export default withRouter(GenericCipher);
