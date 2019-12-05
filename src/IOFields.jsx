import React from 'react';
import { Button } from 'react-bootstrap/'

const IOFields = (props) => {
  const input = props.input
  const output = props.output
  return (
    <>
      <p className="text-left">Input Buffer:</p>
      <textarea rows="6" cols="100" type="textarea" value={input} name="encryption" onChange={props.onInputChange}/>
      <br/>
      <Button
        block
        onClick={props.encryptionFn}
      >
        Encrypt
      </Button>
      <p className="text-left">Output Buffer:</p>
      <textarea rows="6" cols="100" type="textarea" value={output} name="output" onChange={props.onOutputChange}/>
      <br/>
      <Button
        block
        onClick={props.decryptionFn}
      >
        Decrypt
      </Button>
    </>
  );
};

export default IOFields;
