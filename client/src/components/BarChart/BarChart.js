/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import d3Tip from 'd3-tip';
import PropTypes from 'prop-types';

import { calcMaxYDataValue, calcMinYDataValue } from '../../utils/calcCriticalYAxisValue';
import TrendlineCreator from '../../utils/Trendline';
import './BarChart.css';

function BarChart(props) {
  const svgRef = useRef();
  const [width, setWidth] = useState(props.chart.width);
  const [height, setHeight] = useState(props.chart.height);
  const { margin } = props.chart;
  const chart = d3.select(svgRef.current);

  const draw = () => {
    const { goal, trendline, showDataPointsValues, color } = props.settings.display;
    const XAxis = props.settings.axisData.XAxis;
    const YAxis = props.settings.axisData.YAxis;

    chart.selectAll('*').remove();

    const drawLine = (YKey, index) => {
    const { data } = props;
    data.forEach(item => item[YKey] = Number(item[YKey]));
    const yDataRange = {
      min: calcMinYDataValue(
        d3.min(data, (d) => d[YKey]),
        goal
      ),
      max: calcMaxYDataValue(
        d3.max(data, (d) => d[YKey]),
        goal
      ),
    };

    chart.select('.d3-tip').remove();
    const tip = d3Tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(
        (d) =>
          `
        <div><span>${XAxis.label}:</span> <span style='color:white'>${d[XAxis.key]}</span></div>
        <div><span>${YKey}:</span> <span style='color:white'>${d[YKey]}</span></div>
      `
      );
    chart.call(tip).attr('height', '100%').attr('width', '100%');

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d[XAxis.key]))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([yDataRange.min, yDataRange.max])
      .range([height - margin.bottom, margin.top]);

    const xAxis = (g) =>
      g.attr('transform', `translate(0,${height - margin.bottom})`).call(d3.axisBottom(xScale).tickSize(0));
    const yAxis = (g) => g.attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(yScale).tickSize(0));

    let barsInfo = null;
    if (showDataPointsValues) {
      barsInfo = chart.selectAll(`.value-${YKey}`).data(data).join('g');
    }

    chart.append('g').attr('class', 'x-axis axis').call(xAxis);
    chart.append('g').attr('class', 'y-axis axis').call(yAxis);

    chart
      .append('g')
      .attr('class', 'bars')
      .selectAll()
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .attr('fill', color[index])
      .attr('x', (d) => xScale(d[XAxis.key])+index*xScale.bandwidth()/YAxis.key.length)
      .attr('y', (d) => {
        const zero = yScale(0);
        const current = yScale(d[YKey]);
        const yPos = zero > current ? current : zero;
        return yPos;
      })
      .attr('height', (d) => {
        const zero = yScale(0);
        const current = yScale(d[YKey]);
        let barHeight = Math.abs(zero - current);
        if (yDataRange.min >= 0) {
          const chartElemY = chart.node().getBoundingClientRect().y;
          const xAxisElemY = chart.select('.x-axis').node().getBoundingClientRect().y;
          const xAxisY = xAxisElemY - chartElemY;
          barHeight = xAxisY - current;
        }
        return barHeight;
      })
      .attr('width', xScale.bandwidth()/YAxis.key.length)
      .on('mouseenter', (_, index) => {
        chart.selectAll('.bar')
          .filter((__, i) => i !== index)
          .transition()
          .duration(500)
          .attr('opacity', 0.6);
      })
      .on('mouseleave', () => {
        chart.selectAll('.bar').transition().duration(500).attr('opacity', 1);
      })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

      if (showDataPointsValues) {
        barsInfo
          .append('text')
          .attr('class', 'bar__value')
          .attr('x', (a) => {
            console.log(`band ${xScale.bandwidth()}`);
            return xScale(a[XAxis.key]) + (2*index+1)*xScale.bandwidth()/(2*YAxis.key.length)})
          .attr('y', (a) => yScale(a[YKey]) - 20)
          .attr('text-anchor', 'middle')
          .text((a) => `${a[YKey]}`);
      }
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
    }

    YAxis.key.forEach((YKey,index) => drawLine(YKey, index));

    if (trendline.display && data.length && YAxis.key.length === 1) {
      const { polynomial, trendlineType } = trendline;
      const xDataRange = {
        min: data[0][XAxis.key],
        max: data[data.length - 1][XAxis.key[0]],
      };
      const barUnitWidth = (xDataRange.max - xDataRange.min) / data.length;
      const xScaleForLines = d3
        .scaleLinear()
        .domain([xDataRange.min, xDataRange.max])
        .range([margin.left, width - margin.right]);

      const trendlineData = data.map((item) => [item[XAxis.key], item[YAxis.key[0]]]);
      const domain = [xDataRange.min, xDataRange.max - barUnitWidth];
      const config = {
        xOffset: xScale.bandwidth() / 2,
        order: polynomial.order,
      };

      const trendlineCreator = new TrendlineCreator(trendlineType, chart, xScaleForLines, yScale);
      trendlineCreator.render(domain, trendlineData, config);
    }

    
    // delete axis values
    chart.selectAll('.axis').selectAll('text').remove();

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
    setWidth(svgRef.current.parentElement.offsetWidth)
  };

  useEffect(() => {
    setHeight(svgRef.current.parentElement.offsetHeight);
    setWidth(svgRef.current.parentElement.offsetWidth);
    draw();

    window.addEventListener('resize', onResize);
    return ()=>window.removeEventListener('resize', onResize);
  }, [JSON.stringify(props), props.chart, props.data,width, height]);
  
  return <svg ref={svgRef} />;
}

BarChart.propTypes = {
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
      lineType: PropTypes.string,
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

export default BarChart;
