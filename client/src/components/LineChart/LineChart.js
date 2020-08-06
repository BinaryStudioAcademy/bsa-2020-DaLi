import React from 'react';
import * as d3 from 'd3';
import d3Tip from 'd3-tip';

import { calcMaxYDataValue, calcMinYDataValue } from '../../utils/calcCriticalYAxisValue';
import { useEffect } from 'react';
import './LineChart.css';

function LineChart(props) {
  useEffect(() => {
    const { margin, width, height } = props.settings.chart,
      { goal, showTrendLine, showDataPointsValues } = props.settings.display,
      XAxis = props.settings.axisData.XAxis,
      YAxis = props.settings.axisData.YAxis,
      chart = d3.select('svg'),
      { data } = props,
      yDataRange = {
        min: calcMinYDataValue(
          d3.min(data, (d) => d[YAxis.key]),
          goal,
        ),
        max: calcMaxYDataValue(
          d3.max(data, (d) => d[YAxis.key]),
          goal,
        ),
      };

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d[XAxis.key]))
      .range([margin.left, width - margin.right])

    const yScale = d3
    .scaleLinear()
    .domain([yDataRange.min, yDataRange.max])
    .range([height - margin.bottom, margin.top]);

    const line = d3.line()
    .x((d) => { return xScale(d[XAxis.key]); }) 
    .y((d) => { return yScale(d[YAxis.key]); })  
    .curve(d3.curveMonotoneX) 

    const tip  = d3Tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(d => `
      <div><span>${XAxis.label}:</span> <span style='color:white'>${d[XAxis.key]}</span></div>
      <div><span>${YAxis.label}:</span> <span style='color:white'>${d[YAxis.key]}</span></div>
    `)

    chart.call(tip)
    .attr("viewBox", [0, 0, width, height])
  }, []);

  return (
    <div id="container">
      <svg />
    </div>
  );
}

export default LineChart;
