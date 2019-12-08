import React, { useState } from 'react';
import { withRouter } from "react-router";
import { Button, ListGroup } from 'react-bootstrap/'
import * as ui from './ui-functions.js'
import * as crypto from './crypto-functions.js'
import {DragDropContext} from 'react-beautiful-dnd'
import {Droppable} from 'react-beautiful-dnd'
import {Draggable} from 'react-beautiful-dnd'
import IOFields from './IOFields'
import * as R from 'ramda';

const Column = (props) => {
  return (
    <ListGroup as="ul" style={{maxWidth: '50px', width: '50px'}}>
      <ListGroup.Item as="li" style={{padding: 0}}>
        {props.index}
      </ListGroup.Item>
      {props.str.split('').map(c => (
        <ListGroup.Item as="li" style={{padding: 0}}>
          {c}
        </ListGroup.Item>)
      )}
    </ListGroup>
  );
}


const Columns = (props) => {
  if (!Number.isInteger(props.str.length / props.columns)) {
    return(<p>Key Length does not divide length of string evenly</p>)
  }

  const columns = crypto.blockFormat(props.str, props.str.length / props.columns).split(' ').map((str, index) => {
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
          <Column index={index} str={str}/>
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
  const input = ui.fetchBuffer(props, 'input')
  const output = ui.fetchBuffer(props, 'output')
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
      <h4>Columnar Transposition</h4>
      <IOFields
        input={input}
        output={output}
        encryptionFn={() => props.onBufferUpdate('output', crypto.columnarEncrypt(input, key), props.options.global)}
        decryptionFn={() => props.onBufferUpdate('output', crypto.columnarDecrypt(input, key), props.options.global)}
        onInputChange={(e) => props.onBufferUpdate('input', e.target.value, props.options.global)}
        onOutputChange={(e) => props.onBufferUpdate('output', e.target.value, props.options.global)}
      />
      <p className="text-left">Key:</p>
      <input size="100" type="text" value={key} name="key" onChange={updateKey}/>
      {input && <Columns
        str={crypto.cleanupString(input)}
        columnOrder={columnOrder}
        columns={keyLength}
        onDragEnd={onDragEnd}
      />}
    </>
  );
};

export default withRouter(ColumnarTransposition);
