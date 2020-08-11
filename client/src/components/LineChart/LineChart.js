/* eslint-disable */
import React, { useEffect } from 'react';
import * as d3 from 'd3';
import d3Tip from 'd3-tip';
import PropTypes from 'prop-types';

import { calcMaxYDataValue, calcMinYDataValue } from '../../utils/calcCriticalYAxisValue';
import { findLineByLeastSquares } from '../../utils/trendline';

import './LineChart.css';

import {orders} from '../../mock_orders'
import { useRef } from 'react';

function LineChart(props) {
  const svgRef = useRef()
  useEffect(() => {
    const margin = {
      top: 40,
      right: 40,
      bottom: 60,
      left: 60,
    };
    const height = 600;
    const width = 1000;
    const { goal, showTrendLine, showDataPointsValues, lineType, color } = props.settings.display;
    const XAxis = props.settings.axisData.XAxis;
    const YAxis = props.settings.axisData.YAxis;
    const chart = d3.select(svgRef.current);
    // const { data } = props;
    const  data  = orders;
    const yDataRange = {
      min: calcMinYDataValue(
        d3.min(data, (d) => d[YAxis.key]),
        goal
      ),
      max: calcMaxYDataValue(
        d3.max(data, (d) => d[YAxis.key]),
        goal
      ),
    };

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d[XAxis.key]))
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([yDataRange.min, yDataRange.max])
      .range([height - margin.bottom, margin.top]);

    const tip = d3Tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(
        (d) => `
      <div><span>${XAxis.label}:</span> <span style='color:white'>${d[XAxis.key]}</span></div>
      <div><span>${YAxis.label}:</span> <span style='color:white'>${d[YAxis.key]}</span></div>
    `
      );
    chart.call(tip).attr('viewBox', [0, 0, width, height]);

    const line = d3
      .line()
      .x((d) => xScale(d[XAxis.key]) + xScale.bandwidth() / 2)
      .y((d) => yScale(d[YAxis.key]))
      // .curve(d3[lineType]);
      
    chart.append('path').datum(data).attr('class', 'line').attr('d', line).style('stroke', color);

    chart
      .selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', (d) => xScale(d[XAxis.key]) + xScale.bandwidth() / 2)
      .attr('cy', (d) => yScale(d[YAxis.key]))
      .attr('r', 5)
      .style('stroke', color)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

    if (showDataPointsValues) {
      chart
        .selectAll('.dot__value')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'dot__value')
        .attr('x', (d) => xScale(d[XAxis.key]) + xScale.bandwidth() / 2)
        .attr('y', (d) => yScale(d[YAxis.key]) - 20)
        .attr('text-anchor', 'middle')
        .text((d) => d[YAxis.key]);
    }

    const xAxis = (g) => {
      return g.attr('transform', `translate(0,${height - margin.bottom})`).call(d3.axisBottom(xScale).tickSizeOuter(0));
    };
    const yAxis = (g) => g.attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(yScale));

    chart.append('g').attr('class', 'x-axis').call(xAxis);

    chart.append('g').attr('class', 'y-axis').call(yAxis);

    if (showTrendLine && data.length) {
      const xValues = data.map((d) => d[XAxis.key]);
      const yValues = data.map((d) => d[YAxis.key]);
      const lineCoords = findLineByLeastSquares(xValues, yValues);

      chart
        .append('line')
        .attr('id', 'trendline')
        .attr('x1', 0)
        .attr('y1', yScale(lineCoords.start.y))
        .attr('x2', width)
        .attr('y2', yScale(lineCoords.end.y));
    }

    if (YAxis.displayLabel) {
      chart
        .append('text')
        .attr('class', 'label')
        .attr('x', -(height / 2) - margin.left)
        .attr('y', margin.left / 4)
        .attr('transform', 'rotate(-90)')
        .text(YAxis.label);
    }

    if (XAxis.displayLabel) {
      chart
        .append('text')
        .attr('class', 'label')
        .attr('x', width / 2 + margin.bottom)
        .attr('y', height - margin.bottom * 0.2)
        .attr('text-anchor', 'middle')
        .text(XAxis.label);
    }

    if (goal.display) {
      const y = yScale(goal.value);
      chart.append('line').attr('id', 'goal').attr('x1', 0).attr('y1', y).attr('x2', width).attr('y2', y);

      chart
        .append('text')
        .attr('y', y - 10)
        .attr('x', width - 50)
        .attr('text-anchor', 'middle')
        .attr('class', 'goal__label')
        .text(goal.label);
    }
  }, []);

  return (
    <div id="container">
      <svg ref={svgRef} />
    </div>
  );
}

LineChart.propTypes = {
  data: PropTypes.array,
  settings: PropTypes.shape({
    axisData: PropTypes.shape({
      XAxis: PropTypes.shape({
        key: PropTypes.string,
        label: PropTypes.string,
        displayLabel: PropTypes.bool,
      }),
      YAxis: PropTypes.shape({
        key: PropTypes.string,
        label: PropTypes.string,
        displayLabel: PropTypes.bool,
      }),
    }),
    chart: PropTypes.shape({
      margin: PropTypes.shape({
        top: PropTypes.number,
        right: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number,
      }),
      height: PropTypes.number,
      width: PropTypes.number,
    }),
    display: PropTypes.shape({
      goal: PropTypes.shape({
        display: PropTypes.bool,
        value: PropTypes.number,
        label: PropTypes.string,
      }),
      lineType: PropTypes.string,
      showTrendLine: PropTypes.bool,
      showDataPointsValues: PropTypes.bool,
    }),
  }),
};

export default LineChart;
