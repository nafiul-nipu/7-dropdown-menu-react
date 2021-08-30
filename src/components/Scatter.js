export const Scatter = ({data, xScale, yScale, xValue, yValue, tooltipFormat, radius}) => data.map(d => 
    <circle 
        className='mark'
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))}
        r={radius}
    >
        <title>{tooltipFormat(xValue(d))}</title>
    </circle>
  );