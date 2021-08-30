import '../App.css';
export const AxisBottom = ({xScale, innerHeight, tickFormat, tickOffset = 3}) => xScale.ticks().map(tickeValue => (
    <g className="tick" key={tickeValue} transform={`translate(${xScale(tickeValue)},0)`}>
      <line
        y2={innerHeight}
      />
      <text 
        y={innerHeight + tickOffset}
        dy={"0.71em"}
        style={{textAnchor:'middle'}}
      >{tickFormat(tickeValue)}</text>
    </g>
  ));