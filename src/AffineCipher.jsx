import React, { useState } from 'react';
import { withRouter } from "react-router";
import Navbar from 'react-bootstrap/Navbar'
import { Button } from 'react-bootstrap/'
import * as crypto from './crypto-functions.js'

const GenericCipher = (props) => {
  const encryption = props.buffers[`${props.location.pathname}.encryption`]
  const decryption = props.buffers[`${props.location.pathname}.decryption`]
  const keyA = props.buffers[`${props.location.pathname}.keyA`]
  const keyM = props.buffers[`${props.location.pathname}.keyM`]
  return (
    <>
      <p className="text-left">Encryption Buffer:</p>
      <textarea rows="6" cols="100" type="textarea" value={encryption} name="encryption" onChange={(e) => props.onBufferUpdate('encryption', e.target.value, props.global)}/>
      <br/>
      <Button
        block
        onClick={() => props.onBufferUpdate('decryption', crypto.affineEncrypt(encryption, keyM, keyA), props.global)}
      >
        Encrypt
      </Button>
      <p className="text-left">Decryption Buffer:</p>
      <textarea rows="6" cols="100" type="textarea" value={decryption} name="decryption" onChange={(e) => props.onBufferUpdate('decryption', e.target.value, props.global)}/>
      <br/>
      <Button
        block
        onClick={() => props.onBufferUpdate('encryption', crypto.affineDecrypt(encryption, keyM, keyA), props.global)}
      >
        Decrypt
      </Button>
      <p className="text-left">A:</p>
      <input size="100" type="text" value={keyA} name="key" onChange={(e) => props.onBufferUpdate('keyA', e.target.value, props.global)}/>
      <p className="text-left">M:</p>
      <input size="100" type="text" value={keyM} name="key" onChange={(e) => props.onBufferUpdate('keyM', e.target.value, props.global)}/>
    </>
  );
};

export default withRouter(GenericCipher);
