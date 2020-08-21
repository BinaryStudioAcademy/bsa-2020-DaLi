/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import d3Tip from 'd3-tip';
import PropTypes from 'prop-types';

import { calcMaxYDataValue, calcMinYDataValue } from '../../utils/calcCriticalYAxisValue';
import TrendlineCreator from '../../utils/Trendline'

import './LineChart.css';

function LineChart({ settings, data, chart: chartSize }) {
  const { goal, trendline, showDataPointsValues, lineType = 'curveNatural', color } = settings.display;
  const XAxis = settings.axisData.XAxis;
  const YAxis = settings.axisData.YAxis;
  XAxis.key = 'createdAt';
  YAxis.key = 'total';
  data = [
    { total: -10, createdAt: -2018 },
    { total: 100, createdAt: -2019 },
    { total: -50, createdAt: 2020 },
    { total: 320, createdAt: 2021 },
  ];
  data = data.sort((a, b) => a[XAxis.key] - b[XAxis.key]);
  const [config, setConfig] = useState({});
  const svgRef = useRef();
  const [width, setWidth] = useState(chartSize.width);
  const [height, setHeight] = useState(chartSize.height);
  
  const draw = () => {
    setConfig(settings);
    const { margin } = chartSize;

    const chart = d3.select(svgRef.current);

    chart.selectAll('*').remove();

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

    d3.select('.d3-tip').remove();
    const tip = d3Tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(
        (d) => `
    <div><span>${XAxis.label}:</span> <span style='color:white'>${d[XAxis.key]}</span></div>
    <div><span>${YAxis.label}:</span> <span style='color:white'>${d[YAxis.key]}</span></div>
  `
      );

    chart.call(tip).attr('height', '100%').attr('width', '100%');

    const line = d3
      .line()
      .curve(d3[lineType])
      .x((d) => xScale(d[XAxis.key]) + xScale.bandwidth() / 2)
      .y((d) => yScale(d[YAxis.key]));

    chart
      .append('path')
      .datum(data.sort((a, b) => a[XAxis.key] - b[XAxis.key]))
      .attr('class', 'line')
      .attr('d', line)
      .style('stroke', color);

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

    chart.append('g').attr('class', 'x-axis axis').call(xAxis);
    chart.append('g').attr('class', 'y-axis axis').call(yAxis);

    {
      chart
        .append('line')
        .style('stroke', '#EE8625')
        .style('stroke-width', 3)
        .attr('x1', 0)
        .attr('y1', yScale(0))
        .attr('x2', width)
        .attr('y2', yScale(0));

      const y = yScale(0);

      chart
        .append('text')
        .attr('y', y - 10)
        .attr('x',  70)
        .attr('text-anchor', 'middle')
        .attr('class', 'goal__label')
        .style('color', '#EE8625')
        .text('0');
    }

    // delete axis values
    chart.selectAll('.axis').selectAll('text').remove();

    if (trendline.display && data.length) {
      const xDataRange = {
        min: data[0][XAxis.key],
        max: data[data.length - 1][XAxis.key]
      }
      const xScaleForTrendline = d3
      .scaleLinear()
      .domain([xDataRange.min, xDataRange.max])
      .range([margin.left, width - margin.right])
      const {polynomial,trendlineType} = trendline

      const trendlineData = data.map(item => [item[XAxis.key], item[YAxis.key]])
      const barUnitWidth = (xDataRange.max - xDataRange.min) / data.length
      const domain = [xDataRange.min, xDataRange.max - barUnitWidth]
      const config = {
        xOffset: xScale.bandwidth() / 2,
        order: polynomial.order
      }

      const trendlineCreator = new TrendlineCreator(trendlineType, chart, xScaleForTrendline, yScale)
      trendlineCreator.render(domain, trendlineData, config)
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
  };

  const resize = () => {
    setHeight(svgRef.current.parentElement.offsetHeight);
    setWidth(svgRef.current.parentElement.offsetWidth);
}

  useEffect(() => {
    setHeight(svgRef.current.parentElement.offsetHeight);
    setWidth(svgRef.current.parentElement.offsetWidth);
    draw();
    window.addEventListener('resize', resize);

    return () => {window.removeEventListener('resize', resize);}
  }, [goal, trendline, showDataPointsValues, lineType, color, data, chartSize, width, height]);

  return <svg ref={svgRef} />;
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
      trendline: PropTypes.shape({
        display: PropTypes.bool,
        trendlineType: PropTypes.string,
        availableTrendlineTypes: PropTypes.array,
        polynomial: PropTypes.shape({
          availableOrders: PropTypes.array,
          order: PropTypes.number
        })
      }),
      showDataPointsValues: PropTypes.bool,
    }),
  }),
};

export default LineChart;
