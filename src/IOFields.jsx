import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap/'

const IOFields = (props) => {
  const input = props.input
  const output = props.output
  return (
    <>
      <p className="text-left">Input Buffer:</p>
      <textarea rows="6" cols="100" type="textarea" value={input} name="encryption" onChange={props.onInputChange} style={{width: "100%"}}/>
      <br/>
      <ButtonGroup className="btn-block">
        <Button
          onClick={props.encryptionFn}
        >
          Encrypt
        </Button>
        <Button
          onClick={props.decryptionFn}
        >
          Decrypt
        </Button>
      </ButtonGroup>
      <p className="text-left">Output Buffer:</p>
      <textarea rows="6" cols="100" type="textarea" value={output} name="output" onChange={props.onOutputChange} style={{width: "100%"}}/>
      <br/>
    </>
  );
};

export default IOFields;
