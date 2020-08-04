import React, { Component } from 'react';
import * as d3 from 'd3'

var margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

var data = [
  { x: 80, y: 50 }, { x: 110, y: 80 }, { x: 140, y: 90 },
  { x: 170, y: 70 }, { x: 200, y: 60 }, { x: 230, y: 60 },
  { x: 260, y: 70 }, { x: 290, y: 80 }, { x: 320, y: 70 }
];

class LineChartContainer extends Component {
  drawChart() {
    var svg = d3.select("body")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr('fill', 'transparent')
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")")
      .attr('stroke', 'red');

    var x = d3.scaleTime()
      .domain(d3.extent(data, function (d) { return d.x; }))
      .range([0, width]);

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr('fill', 'red')
      .call(d3.axisBottom(x));

    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function (d) { return +d.y; })])
      .range([height, 0]);

    svg.append("g")
      .call(d3.axisLeft(y));

    return svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function (d) { return x(d.x) })
        .y(function (d) { return y(d.y) })
      )
  }

  render() {
    this.drawChart()
    return null
  }
};

export default LineChartContainer;