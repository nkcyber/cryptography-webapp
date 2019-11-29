import React, { useState } from 'react';
import { Button } from 'react-bootstrap/'
import * as ui from './ui-functions.js'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'
import * as R from 'ramda';

const frequencyAnalysisToGraphData = (value, key) => {
  return { character: key, count: value }
}

const getGraphData = (str) => {
  return Object.values(R.pickBy((val, key) => key.match(/[a-z]/i), R.mapObjIndexed(frequencyAnalysisToGraphData,  ui.frequencyAnalysis(str))))
}

const FrequencyGraph = (props) => {
  const data = getGraphData(props.buffers['global.encryption'])
  return (
    <>
      <h4>Frequency Analysis</h4>
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="character" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </>
  );
};

export default FrequencyGraph;
