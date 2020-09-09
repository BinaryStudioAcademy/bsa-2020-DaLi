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
  const { data } = props;
  const { goal, trendline, showDataPointsValues, color, stacked } = props.settings.display;
  const XAxis = props.settings.axisData.XAxis;
  const YAxis = props.settings.axisData.YAxis;

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

  const drawAxes = (chart, xScale, yMaxIndex) => {
    const yScale = calcYScale(YAxis.key[yMaxIndex]);
    const xAxis = (g) =>
      g.attr('transform', `translate(0,${height - margin.bottom})`).call(d3.axisBottom(xScale).tickSize(0));
    const yAxis = (g) => g.attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(yScale).tickSize(0));

    chart.append('g').attr('class', 'x-axis axis').call(xAxis).selectAll("text")
    .attr("y", 0)
    .attr("x", -9)
    .attr("dy", ".35em")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end");
    chart.append('g').attr('class', 'y-axis axis').call(yAxis);
  };

  const drawGroupedChart = (chart, data, xScale, xSubgroup, colors, tips, yMaxIndex) => {
    chart
      .append('g')
      .attr('class', 'bars')
      .selectAll()
      .data(data)
      .enter()
      .append('g')
      .attr('transform', (d) => 'translate(' + xScale(d[XAxis.key]) + ',0)')
      .selectAll('rect')
      .data((d) =>
        YAxis.key.map((key, index) => {
          return { key: key, value: d[key], index: index, [XAxis.key]: d[XAxis.key] };
        })
      )
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xSubgroup(d.key))
      .attr('y', (d) => {
        const zero = calcYScale(YAxis.key[yMaxIndex])(0);
        const current = calcYScale(YAxis.key[yMaxIndex])(d.value);
        const yPos = zero > current ? current : zero;
        return yPos;
      })
      .attr('width', xSubgroup.bandwidth())
      .attr('height', (d) => {
        const zero = calcYScale(YAxis.key[yMaxIndex])(0);
        const current = calcYScale(YAxis.key[yMaxIndex])(d.value);
        let barHeight = Math.abs(zero - current);
        if (calcYDataRange(YAxis.key[yMaxIndex]).min >= 0) {
          const chartElemY = chart.node().getBoundingClientRect().y;
          const xAxisElemY = chart.select('.x-axis').node().getBoundingClientRect().y;
          const xAxisY = xAxisElemY - chartElemY;
          barHeight = xAxisY - current;
        }
        return barHeight;
      })
      .attr('fill', (d) => colors(d.key))
      .on('mouseover', (d, index, elem) => {
        tips.show(d, elem[index]);
        fade(0.4, d);
      })
      .on('mouseout', (d, index, elem) => {
        tips.hide(d, elem[index]);
        resetFade();
      });

    if (showDataPointsValues) {
    const xPosGrouped = (a, index) => xScale(a[XAxis.key]) + ((2 * index + 1) * xScale.bandwidth()) / (2 * YAxis.key.length);
    const yPosGrouped = (a, key, index) => calcYScale(YAxis.key[yMaxIndex])(a[key]) - 10;
    const pointText = (a, key) => `${a[key]}`;

      YAxis.key.forEach((key, index) =>
      chart
        .selectAll(`.value`)
        .data(data)
        .join('g')
        .append('text')
        .attr('class', 'bar__value')
        .attr('x', (a) => xPosGrouped(a, index))
        .attr('y', (a, barIndex) => yPosGrouped(a, key, index))
        // .attr('transform', d => (YAxis.key.length > 1 && !stacked)?`translate(${xPosGrouped(d,index)},${yPosGrouped(d,key,index)}), rotate(-90)`:'rotate(0)')
        .attr('text-anchor', 'middle')
        .text((a) => pointText(a, key))
      )
    }
  };

  const fade = (opacity, selectedBar) => {
    d3.selectAll('.bar')
      .filter(function (d, i) {
        return selectedBar !== d;
      })
      .transition()
      .duration(500)
      .style('opacity', opacity);
  };

  const resetFade = () => {
    d3.selectAll('.bar').transition().duration(500).style('opacity', 1);
  };

  const drawStackedChart = (chart, xScale, tips) => {
    // stacks / layers
    const stackGenerator = d3.stack().keys(YAxis.key).order(d3.stackOrderDescending);
    const layers = stackGenerator(data);
    const extent = [0, d3.max(layers, (layer) => d3.max(layer, (sequence) => sequence[1]))];

    const yScale = calcYScale(null, extent);

    // rendering
    chart
      .selectAll('.layer')
      .data(layers)
      .join('g')
      .attr('class', 'layer')
      .attr('fill', (layer) => color[YAxis.key.indexOf(layer.key)])
      .selectAll('rect')
      .data((layer) => {
        return layer.map((sequence) => {
          sequence.key = layer.key;
          return sequence;
        });
      })
      .join('rect')
      .attr('class', 'bar')
      .attr('x', (sequence) => xScale(sequence.data[XAxis.key]))
      .attr('width', xScale.bandwidth())
      .attr('y', (sequence) => {
        return yScale(sequence[1]);
      })
      .attr('height', (sequence) => yScale(sequence[0]) - yScale(sequence[1]))
      .on('mouseover', (d, index, elem) => {
        fade(0.4, d); tips.show(d, elem[index]);
      })
      .on('mouseout', (d, index, elem) => { tips.hide(d, elem[index]); resetFade();});

    if (showDataPointsValues) {
      const values = layers.map((a) => a.map((item) => item[1]));
      const maxValues = values.reduce((prev, current) =>
        current.map((item, index) => (item > prev[index] ? item : prev[index]))
      );

      chart
        .selectAll(`.value`)
        .data(layers[0])
        .join('g')
        .append('text')
        .attr('class', 'bar__value')
        .attr('x', (a) => xScale(a.data[XAxis.key]) + xScale.bandwidth() / 2)
        .attr('y', (a, index) => {
          return yScale(maxValues[index]) - 10;
        })
        // .attr('transform', d => (YAxis.key.length > 1 && !stacked)?`translate(${xPosGrouped(d,index)},${yPosGrouped(d,key,index)}), rotate(-90)`:'rotate(0)')
        .attr('text-anchor', 'middle')
        .text((a, index) => maxValues[index]);
    }
  };

  const showLegend = (chart) => {
    const legendContainer = chart.append('g').attr('transform', 'translate(' + (margin.left + 50) + ',0)');
    const legendRectSize = 18;
    const legendSpacing = 4;

    const legend = legendContainer
      .selectAll('.legend')
      .data(YAxis.label)
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
    chart.select('.d3-tip').remove();
    const tipHtmlStacked = (d) => `
    <div><span>${XAxis.label}:</span> <span style='color:white'>${d.data[XAxis.key]}</span></div>
    <div><span>${d.key}:</span> <span style='color:white'>${d.data[d.key]}</span></div>
  `;
    const tipHtmlGrouped = (d) => `
    <div><span>${XAxis.label}:</span> <span style='color:white'>${d[XAxis.key]}</span></div>
    <div><span>${d.key}:</span> <span style='color:white'>${d.value}</span></div>
  `;

    const tips = d3Tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html((d) => (stacked ? tipHtmlStacked(d) : tipHtmlGrouped(d)));
      chart.call(tips).attr('height', '100%').attr('width', '100%');
    return tips;
  };

  const addTrendLine = (chart,yMaxIndex) => {
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

    const yScale = calcYScale(YAxis.key[yMaxIndex]);

    const trendlineCreator = new TrendlineCreator(trendlineType, chart, xScaleForLines, yScale);
    trendlineCreator.render(domain, trendlineData, config);
  };

  const displayAxesLabels = (chart) => {
    if (YAxis.displayLabel) {
      chart
        .append('text')
        .attr('class', 'label')
        .attr('x', -(height / 2))
        .attr('y', margin.left - 40)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text(YAxis.label[0]);
    }

    if (XAxis.displayLabel) {
      chart
        .append('text')
        .attr('class', 'label')
        .attr('x', width / 2)
        .attr('y', height - margin.bottom + 60)
        .attr('text-anchor', 'middle')
        .text(XAxis.label);
    }
  };

  const displayGoalLine = (chart,yMaxIndex) => {
    const y = calcYScale(YAxis.key[yMaxIndex])(goal.value);
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
    const chart = initChart(svgRef.current);
    chart.selectAll('*').remove();

    convertStringData(data, YAxis.key);

    const tips = createTips(chart);

    const xScale = calcXScale(data, XAxis.key);
    const yMaxValues = YAxis.key.map(key => calcYDataRange(key).max);
    const yMax = Math.max(...yMaxValues);
    const yMaxIndex = yMaxValues.findIndex(item => item === yMax);

    drawAxes(chart, xScale,yMaxIndex);

    // Another scale for subgroup position?
    const xSubgroup = d3.scaleBand().domain(YAxis.key).range([0, xScale.bandwidth()]).padding([0.05]);

    // color palette = one color per subgroup
    const colors = d3.scaleOrdinal().domain(YAxis.key).range(color);

    // draw chart
    stacked ? drawStackedChart(chart, xScale, tips) : drawGroupedChart(chart, data, xScale, xSubgroup, colors, tips, yMaxIndex);

    // let barsInfo = null;

    const yScale = calcYDataRange(YAxis.key[yMaxIndex]);
    if (yScale.min < 0) {
      chart
        .append('line')
        .style('stroke', '#EE8625')
        .style('stroke-width', 3)
        .attr('x1', 0)
        .attr('y1', yScale(0))
        .attr('x2', width)
        .attr('y2', yScale(0));

      const y = calcYScale(YAxis.key[yMaxIndex]);

      chart
        .append('text')
        .attr('y', y - 10)
        .attr('x', 70)
        .attr('text-anchor', 'middle')
        .attr('class', 'line__label')
        .text('0');
    }

    if (goal.display) {
      displayGoalLine(chart,yMaxIndex);
    }

    if (trendline.display && data.length) {
      addTrendLine(chart,yMaxIndex);
    }

    // delete axis values
    // chart.selectAll('.axis').selectAll('text').remove();

    displayAxesLabels(chart);

    if (YAxis.key.length > 1) {
      showLegend(chart);
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
  }, [JSON.stringify(props), props.chart, props.data, width, height]);

  return <svg ref={svgRef} id="barChartVisualization" />;
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
        label: PropTypes.array,
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
      stacked: PropTypes.bool,
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
