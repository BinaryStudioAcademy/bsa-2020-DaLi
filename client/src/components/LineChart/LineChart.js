/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import d3Tip from 'd3-tip';
import PropTypes from 'prop-types';

import { calcMaxYDataValue, calcMinYDataValue } from '../../utils/calcCriticalYAxisValue';
import TrendlineCreator from '../../utils/Trendline';

import './LineChart.css';

function LineChart({ settings, data, chart: chartSize }) {
  const { goal, trendline, showDataPointsValues, lineType = 'curveNatural', color } = settings.display;
  const XAxis = settings.axisData.XAxis;
  const YAxis = settings.axisData.YAxis;

  // const [config, setConfig] = useState({});
  const svgRef = useRef();
  const [width, setWidth] = useState(chartSize.width);
  const [height, setHeight] = useState(chartSize.height);
  const { margin } = chartSize;

  // const chart = d3.select(svgRef.current);
  const initChart = (ref) => {
    const chart = d3.select(ref).attr('width', '100%').attr('height', '100%');
    return chart;
  };

  const convertStringData = (data, keys) => {
    data.forEach((item) => {
      keys.forEach((YKey) => {
        item[YKey] = Number(item[YKey]);
      });
    });
  };

  const calcYDataRange = (YKey) => {
    return {
      min: calcMinYDataValue(
        d3.min(data, (d) => d[YKey]),
        goal
      ),
      max: calcMaxYDataValue(
        d3.max(data, (d) => d[YKey]),
        goal
      ),
    };
  };

  const calcXScale = (data, XKey) => {
    return d3
      .scaleBand()
      .domain(data.map((d) => d[XKey]))
      .range([margin.left, width - margin.right])
      .padding(0.1);
  };

  const calcYScale = (YKey, extent = null) => {
    return d3
      .scaleLinear()
      .domain(extent ? extent : [calcYDataRange(YKey).min, calcYDataRange(YKey).max])
      .range([height - margin.bottom, margin.top]);
  };

  const drawAxes = (chart, xScale) => {
    const yScale = calcYScale(YAxis.key[0]); // TODO: yScale[0] replace
    const xAxis = (g) =>
      g.attr('transform', `translate(0,${height - margin.bottom})`).call(d3.axisBottom(xScale).tickSize(0));
    const yAxis = (g) => g.attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(yScale).tickSize(0));

    chart.append('g').attr('class', 'x-axis axis').call(xAxis);
    chart.append('g').attr('class', 'y-axis axis').call(yAxis);
  };

  const showLegend = (chart) => {
    const legendContainer = chart.append('g').attr('transform', 'translate(' + (margin.left + 50) + ',0)');
    const legendRectSize = 18;
    const legendSpacing = 4;

    const legend = legendContainer
      .selectAll('.legend')
      .data(YAxis.key)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', function (d, i) {
        const width = legendRectSize + legendSpacing + 40;
        const offset = (width * 3) / 2;
        const horz = i * offset;
        const vert = 0;
        return 'translate(' + horz + ',' + vert + ')';
      });

    legend
      .append('rect')
      .attr('width', legendRectSize)
      .attr('height', legendRectSize)
      .style('fill', (d, i) => color[i])
      .style('stroke', (d, i) => color[i]);

    legend
      .append('text')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize - legendSpacing)
      .text((d) => d);
  };

  const createTips = (chart) => {
    chart.select(`.d3-tip`).remove();
    const tip = d3Tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(
        (d) => `
  <div><span>${XAxis.label}:</span> <span style='color:white'>${d[XAxis.key]}</span></div>
  <div><span>${YKey}:</span> <span style='color:white'>${d[YKey]}</span></div>
`
      );

    chart.call(tip).attr('height', '100%').attr('width', '100%');
  }

  const addTrendLine = (chart) => {
    const { polynomial, trendlineType } = trendline;
    const xDataRange = {
      min: data[0][XAxis.key],
      max: data[data.length - 1][XAxis.key],
    };
    const barUnitWidth = (xDataRange.max - xDataRange.min) / data.length;
    const xScaleForLines = d3
      .scaleLinear()
      .domain([xDataRange.min, xDataRange.max])
      .range([margin.left, width - margin.right]);

    const trendlineData = data.map((item) => [item[XAxis.key], item[YAxis.key[0]]]);
    const domain = [xDataRange.min, xDataRange.max - barUnitWidth];
    const config = {
      xOffset: calcXScale(data, XAxis.key).bandwidth() / 2,
      order: polynomial.order,
    };

    const yScale = calcYScale(YAxis.key[0]);

    const trendlineCreator = new TrendlineCreator(trendlineType, chart, xScaleForLines, yScale);
    trendlineCreator.render(domain, trendlineData, config);
  };

  const displayAxesLabels = (chart) => {
    if (YAxis.displayLabel) {
      chart
        .append('text')
        .attr('class', 'label')
        .attr('x', -(height / 2))
        .attr('y', margin.left - 10)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text(YAxis.label);
    }

    if (XAxis.displayLabel) {
      chart
        .append('text')
        .attr('class', 'label')
        .attr('x', width / 2)
        .attr('y', height - margin.bottom + 30)
        .attr('text-anchor', 'middle')
        .text(XAxis.label);
    }
  };

  const displayGoalLine = (chart) => {
    const y = calcYScale(YAxis.key[0])(goal.value);
    chart.append('line').attr('id', 'goal').attr('x1', 0).attr('y1', y).attr('x2', width).attr('y2', y);

    chart
      .append('text')
      .attr('y', y - 10)
      .attr('x', width - 50)
      .attr('text-anchor', 'middle')
      .attr('class', 'line__label')
      .text(goal.label);
  };

  const draw = () => {
    // setConfig(settings);

    chart.selectAll('*').remove();



      const line = d3
        .line()
        .curve(d3[lineType[index]])
        .x((d) => xScale(d[XAxis.key]) + xScale.bandwidth() / 2)
        .y((d) => yScale(d[YKey]));
      chart
        .append('path')
        .datum(data.sort((a, b) => a[XAxis.key] - b[XAxis.key]))
        .attr('class', 'line')
        .attr('d', line)
        .style('stroke', color[index]);
      chart
        .selectAll(`.dot-${YKey}`)
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx', (d) => xScale(d[XAxis.key]) + xScale.bandwidth() / 2)
        .attr('cy', (d) => yScale(d[YKey]))
        .attr('r', 5)
        .style('stroke', color[index])
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);
      if (showDataPointsValues) {
        chart
          .selectAll(`.dot__value-${YKey}`)
          .data(data)
          .enter()
          .append('text')
          .attr('class', 'dot__value')
          .attr('x', (d) => xScale(d[XAxis.key]) + xScale.bandwidth() / 2)
          .attr('y', (d) => yScale(d[YKey]) - 20)
          .attr('text-anchor', 'middle')
          .text((d) => d[YKey]);
      }
      // const xAxis = (g) => {
      //   return g.attr('transform', `translate(0,${height - margin.bottom})`).call(d3.axisBottom(xScale).tickSize(0));
      // };
      // const yAxis = (g) => g.attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(yScale).tickSize(0));
      // chart.append('g').attr('class', 'x-axis axis').call(xAxis);
      // chart.append('g').attr('class', 'y-axis axis').call(yAxis);

      if (yDataRange.min < 0) {
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
          .attr('x', 70)
          .attr('text-anchor', 'middle')
          .attr('class', 'line__label')
          .text('0');
      }

      if (goal.display && index === 1) {
        const y = yScale(goal.value);
        chart.append('line').attr('id', 'goal').attr('x1', 0).attr('y1', y).attr('x2', width).attr('y2', y);
  
        chart
          .append('text')
          .attr('y', y - 10)
          .attr('x', width - 50)
          .attr('text-anchor', 'middle')
          .attr('class', 'line__label')
          .text(goal.label);
      }
    // };

    // YAxis.key.forEach((YKey, index) => drawLine(YKey, index));

    // delete axis values
    chart.selectAll('.axis').selectAll('text').remove();

    if (trendline.display && data.length && YAxis.key.length === 1) {
      const xDataRange = {
        min: data[0][XAxis.key],
        max: data[data.length - 1][XAxis.key],
      };
      const xScaleForTrendline = d3
        .scaleLinear()
        .domain([xDataRange.min, xDataRange.max])
        .range([margin.left, width - margin.right]);
      const { polynomial, trendlineType } = trendline;

      const trendlineData = data.map((item) => [item[XAxis.key], item[YAxis.key[0]]]);
      const barUnitWidth = (xDataRange.max - xDataRange.min) / data.length;
      const domain = [xDataRange.min, xDataRange.max - barUnitWidth];
      const config = {
        xOffset: xScale.bandwidth() / 2,
        order: polynomial.order,
      };

      const trendlineCreator = new TrendlineCreator(trendlineType, chart, xScaleForTrendline, yScale);
      trendlineCreator.render(domain, trendlineData, config);
    }

    if (YAxis.displayLabel) {
      chart
        .append('text')
        .attr('class', 'label')
        .attr('x', -height / 2)
        .attr('y', margin.left - 10)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text(YAxis.label);
    }

    if (XAxis.displayLabel) {
      chart
        .append('text')
        .attr('class', 'label')
        .attr('x', width / 2)
        .attr('y', height - margin.bottom + 30)
        .attr('text-anchor', 'middle')
        .text(XAxis.label);
    }

    const legendContainer = chart.append('g').attr('transform', 'translate(' + (margin.left + 50) + ',0)');

    const legendRectSize = 18;
    const legendSpacing = 4;

    if(YAxis.key.length>1){
    const legend = legendContainer
      .selectAll('.legend')
      .data(YAxis.key)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', function (d, i) {
        const width = legendRectSize + legendSpacing + 40;
        // const offset = (width * color.length) / 2;
        const offset = (width * 3) / 2;
        const horz = i*offset;
        const vert = 0;
        return 'translate(' + horz + ',' + vert + ')';
      });

    legend
      .append('rect')
      .attr('width', legendRectSize)
      .attr('height', legendRectSize)
      .style('fill', (d, i) => color[i])
      .style('stroke', (d, i) => color[i]);

    legend
      .append('text')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize - legendSpacing)
      .text((d) => d);
    }
  };

  const onResize = () => {
    setHeight(svgRef.current.parentElement.offsetHeight);
    setWidth(svgRef.current.parentElement.offsetWidth);
  };

  useEffect(() => {
    setHeight(svgRef.current.parentElement.offsetHeight);
    setWidth(svgRef.current.parentElement.offsetWidth);
    draw();

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [JSON.stringify(settings), data, chartSize, width, height]);

  return <svg id="lineChartVisualization" ref={svgRef} />;
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
        key: PropTypes.array,
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
      lineType: PropTypes.array,
      trendline: PropTypes.shape({
        display: PropTypes.bool,
        trendlineType: PropTypes.string,
        availableTrendlineTypes: PropTypes.array,
        polynomial: PropTypes.shape({
          availableOrders: PropTypes.array,
          order: PropTypes.number,
        }),
      }),
      showDataPointsValues: PropTypes.bool,
    }),
  }),
};

export default LineChart;
