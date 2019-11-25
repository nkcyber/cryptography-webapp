import React, { useState } from 'react';
import { withRouter } from "react-router";
import Navbar from 'react-bootstrap/Navbar'
import { Button } from 'react-bootstrap/'

const GenericCipher = (props) => {
  const encryption = props.buffers[`${props.location.pathname}.encryption`]
  const decryption = props.buffers[`${props.location.pathname}.decryption`]
  const key = props.buffers[`${props.location.pathname}.key`]
  return (
    <>
      <p className="text-left">Encryption Buffer:</p>
      <textarea rows="6" cols="100" type="textarea" value={encryption} name="encryption" onChange={(e) => props.onBufferUpdate('encryption', e.target.value, props.global)}/>
      <br/>
      <Button
        block
        onClick={() => props.onBufferUpdate('decryption', props.encryptionFn(encryption, key), props.global)}
      >
        Encrypt
      </Button>
      <p className="text-left">Decryption Buffer:</p>
      <textarea rows="6" cols="100" type="textarea" value={decryption} name="decryption" onChange={(e) => props.onBufferUpdate('decryption', e.target.value, props.global)}/>
      <br/>
      <Button
        block
        onClick={() => props.onBufferUpdate('encryption', props.decryptionFn(decryption, key), props.global)}
      >
        Decrypt
      </Button>
      <p className="text-left">Key:</p>
      <input size="100" type="text" value={key} name="key" onChange={(e) => props.onBufferUpdate('key', e.target.value, props.global)}/>
    </>
  );
};

export default withRouter(GenericCipher);
