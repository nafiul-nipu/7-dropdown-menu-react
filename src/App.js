import './App.css';
import {scaleLinear,  format, extent} from 'd3';

import { useData } from './components/useData';
import { AxisBottom } from './components/AxisBottom';
import { AxisLeft } from './components/AxisLeft';
import { Scatter } from './components/Scatter';
import {Dropdown} from './components/Dropdown'
import { useState } from 'react';

const width = 960;
const menuHeight = 75;
const height = 500 - menuHeight;
const margin = {top:20, right:30, bottom:65, left:90} 

const xAxisLabelOffset = 50
const yAxisLabelOffset = 40


const attributes = [
  { value: "sepal_length", label:"Sepal Length"}, 
  { value: "sepal_width", label:"Sepal Width"}, 
  { value: "petal_length", label:"Petal Length"}, 
  { value: "petal_width", label:"Petal Width"}, 
  { value: "species", label:"Species"}
];

const getLbael = value => {
  for(let i = 0; i < attributes.length; i ++){
    if (attributes[i].value === value){
      return attributes[i].label
    }
  }
}

function App() {
  const data = useData()

  const initialxAttribute = 'petal_length'
  const [xAttribute, setxAttribute] = useState(initialxAttribute)
  const xValue = d => d[xAttribute];
  const xAxisLabel = getLbael(xAttribute)

  const initialyAttribute = 'sepal_width'
  const [yAttribute, setyAttribute] = useState(initialyAttribute)
  const yValue = d => d[yAttribute];
  const yAxisLabel = getLbael(yAttribute)

  if(!data){
    return <pre>Loading ...</pre>
  }


  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right


  const siFormat = format('.2s')
  const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B')

  const xScale = scaleLinear()
                  .domain(extent(data, xValue))
                  .range([0, innerWidth])
                  .nice()

  const yScale = scaleLinear()
                  .domain(extent(data, yValue))
                  .range([0, innerHeight])
 

  return (
    <>
      <label for='x-select'>X:</label>
      <Dropdown
        options={attributes}
        id='x-select'
        selectedValue={xAttribute}
        onSelectedValueChane={setxAttribute}
      />

      <label for='y-select'>Y:</label>
      <Dropdown
        options={attributes}
        id='y-select'
        selectedValue={yAttribute}
        onSelectedValueChane={setyAttribute}
      />

      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
        
        <AxisBottom 
          xScale ={xScale}
          innerHeight = {innerHeight}
          tickFormat = {xAxisTickFormat}
          tickOffset = {5}
        />

        <text
          className='axis-label'
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor='middle'
        >{xAxisLabel}</text>

        <AxisLeft 
          yScale = {yScale}
          innerWidth={innerWidth}
          tickOffset = {5}
        />
        
        <text
          className='axis-label'       
          textAnchor='middle'
          transform={`translate(${-yAxisLabelOffset}, ${innerHeight / 2} )rotate(-90)`}
        >{yAxisLabel}</text>

        <Scatter 
          data={data}
          xScale = {xScale}
          yScale = {yScale}
          xValue = {xValue}
          yValue = {yValue}
          tooltipFormat = {xAxisTickFormat}
          radius={7}
        />
        </g>
      </svg>
    </>
  );

}

export default App;
 