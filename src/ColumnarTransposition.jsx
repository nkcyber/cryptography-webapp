import React, { useState } from 'react';
import { withRouter } from "react-router";
import { Button, ListGroup } from 'react-bootstrap/'
import * as ui from './ui-functions.js'
import * as crypto from './crypto-functions.js'
import {DragDropContext} from 'react-beautiful-dnd'
import {Droppable} from 'react-beautiful-dnd'
import {Draggable} from 'react-beautiful-dnd'
import * as R from 'ramda';

const Column = (props) => {
  return (
    <ListGroup as="ul" style={{maxWidth: '50px', width: '50px'}}>
      {props.str.split('').map(c => (
        <ListGroup.Item as="li" style={{padding: 0}}>
          {c}
        </ListGroup.Item>)
      )}
    </ListGroup>
  );
}


const Columns = (props) => {

  const columns = crypto.blockFormat(props.str, Math.ceil(props.str.length / props.columns)).split(' ').map((str, index) => {
    const columnIndex = props.columnOrder.indexOf(index)
    return {index: index, data: (
    <Draggable key={""+columnIndex} draggableId={""+columnIndex} index={columnIndex}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          style={{...provided.draggableStyle}}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Column str={index+str}/>
        </div>
      )}
    </Draggable>
  )}})

  return (
    <DragDropContext
      onDragEnd={(a) => props.onDragEnd(a)}
    >
      <Droppable droppableId={"1"} direction="horizontal">
        {provided =>
          (<span
            style={{display: 'flex',
                    padding: 8,
                    overflow: 'auto',}}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {R.sortBy(R.pipe(R.prop('index'), R.indexOf(R.__, props.columnOrder)))(columns).map(a => a.data)}
            {provided.placeholder}
          </span>)
        }
      </Droppable>
    </DragDropContext>
  );
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const ColumnarTransposition = (props) => {
  const encryption = ui.fetchBuffer(props, 'encryption')
  const decryption = ui.fetchBuffer(props, 'decryption')
  const key = ui.fetchBuffer(props, 'key')
  const keyLength = key ? key.length : 1
  const [columnOrder, setColumns] = useState(R.times(R.identity, keyLength))
  const updateKey = (e) => {
    props.onBufferUpdate('key', e.target.value, props.options.global)
    setColumns(R.times(R.identity, e.target.value.length))
  }
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      columnOrder,
      result.source.index,
      result.destination.index
    );

    setColumns(items);
  }

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
      <input size="100" type="text" value={key} name="key" onChange={updateKey}/>
      {decryption && <Columns
        str={decryption}
        columnOrder={columnOrder}
        columns={keyLength}
        onDragEnd={onDragEnd}
      />}
    </>
  );
};

export default withRouter(ColumnarTransposition);
