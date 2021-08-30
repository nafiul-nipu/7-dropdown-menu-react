export const AxisLeft = ({yScale, innerWidth, tickOffset=3}) => yScale.ticks().map(tickeValue => (       
    <g className='tick' transform={`translate(0, ${yScale(tickeValue)})`}>
      <line
        x2={innerWidth}
      />
      <text 
      key={tickeValue}
      style={{textAnchor:'end'}}
      x={-tickOffset}
      dy={'0.32em'}
      >{tickeValue}</text>
    </g>
  ));