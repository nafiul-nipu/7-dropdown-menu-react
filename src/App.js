import './App.css';
import './ReactDropdown.css'
import {scaleOrdinal, scaleLinear,  format, extent} from 'd3';
import ReactDropdown from 'react-dropdown';

import { useData } from './components/useData';
import { AxisBottom } from './components/AxisBottom';
import { AxisLeft } from './components/AxisLeft';
import { Scatter } from './components/Scatter';
import {Dropdown} from './components/Dropdown'
import { useState } from 'react';
import { ColorLegend } from './components/ColorLegend';

const width = 960;
const menuHeight = 75;
const height = 500 - menuHeight;
const margin = {top:20, right:200, bottom:65, left:90} 

const xAxisLabelOffset = 50
const yAxisLabelOffset = 40

const radius = 7

const fadeOpacity = 0.2

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
  // console.log(ReactDropdown)
  const data = useData()
  const [hoveredValue, setHoveredValue] = useState(null)

  const initialxAttribute = 'petal_length'
  const [xAttribute, setxAttribute] = useState(initialxAttribute)
  const xValue = d => d[xAttribute];
  const xAxisLabel = getLbael(xAttribute)

  const initialyAttribute = 'sepal_width'
  const [yAttribute, setyAttribute] = useState(initialyAttribute)
  const yValue = d => d[yAttribute];
  const yAxisLabel = getLbael(yAttribute)

  const colorLegendLabel = 'Species';
  const colorValue = d => d.species;

  if(!data){
    return <pre>Loading ...</pre>
  }

  const filteredData = data.filter(d => hoveredValue === colorValue(d))

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
 
  const colorScale = scaleOrdinal()
                      .domain(data.map(colorValue))
                      .range(["#E6842A", "#137B80", "#8E6C8A"])

  return (
    <>
      <div className='menu-container'>
        <span className='dropdown-label'>X</span>
          <ReactDropdown
            options={attributes}
            value={xAttribute}
            onChange={({value}) => setxAttribute(value)}
          />

          <span className='dropdown-label'>Y</span>
          <ReactDropdown
            options={attributes}
            value={yAttribute}
            onChange={({value}) => setyAttribute(value)}
        />
      </div>        

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

        <g transform={`translate(${innerWidth + 50},${margin.bottom})`}>
          <ColorLegend 
            colorScale={colorScale}
            tickSpacing = {22}
            tickSize = {radius}
            tickTextOffset = {12}
            onHover={setHoveredValue}
            hoveredValue={hoveredValue}
            fadeOpacity={fadeOpacity}
          />

          <text
            x={35}
            y={-25}
            className='axis-label'       
            textAnchor='middle'

          >{colorLegendLabel}</text>

        </g>

        <g opacity={hoveredValue ? fadeOpacity : 1}>
          <Scatter 
            data={data}
            xScale = {xScale}
            yScale = {yScale}
            colorScale = {colorScale}
            xValue = {xValue}
            yValue = {yValue}
            colorValue = {colorValue}
            tooltipFormat = {xAxisTickFormat}
            radius={radius}
          />
        </g>

        <Scatter 
          data={filteredData}
          xScale = {xScale}
          yScale = {yScale}
          colorScale = {colorScale}
          xValue = {xValue}
          yValue = {yValue}
          colorValue = {colorValue}
          tooltipFormat = {xAxisTickFormat}
          radius={radius}
        />

        </g>
      </svg>
    </>
  );

}

export default App;
 