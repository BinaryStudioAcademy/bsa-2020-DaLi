import React, { Component } from 'react';
import * as d3 from 'd3'

var data = [{ "id": 1, "userId": 1, "productId": 1, "total": 963.84, "discount": 1.49, "createdAt": "1567655454000", "quantity": 33 },
{ "id": 2, "userId": 2, "productId": 2, "total": 774.33, "discount": 13.21, "createdAt": "1589701805000", "quantity": 59 },
{ "id": 3, "userId": 3, "productId": 3, "total": 171.63, "discount": 17.22, "createdAt": "1575535794000", "quantity": 57 },
{ "id": 4, "userId": 4, "productId": 4, "total": 966.46, "discount": 9.24, "createdAt": "1579608272000", "quantity": 58 },
{ "id": 5, "userId": 5, "productId": 5, "total": 441.38, "discount": 18.97, "createdAt": "1596427451000", "quantity": 26 },
{ "id": 6, "userId": 6, "productId": 6, "total": 534.71, "discount": 3.54, "createdAt": "1582318825000", "quantity": 15 },
{ "id": 7, "userId": 7, "productId": 7, "total": 210.39, "discount": 3.5, "createdAt": "1582663321000", "quantity": 10 },
{ "id": 8, "userId": 8, "productId": 8, "total": 991.35, "discount": 10.7, "createdAt": "1569735016000", "quantity": 49 },
{ "id": 9, "userId": 9, "productId": 9, "total": 719.22, "discount": 6.66, "createdAt": "1595927435000", "quantity": 87 },
{ "id": 10, "userId": 10, "productId": 10, "total": 889.79, "discount": 3.34, "createdAt": "1583510495000", "quantity": 2 }
]

class LineChartContainer extends Component {
  constructor() {
    super()
    this.margin = {
      top: 10,
      right: 30,
      bottom: 30,
      left: 60
    };
    this.width = 860 - this.margin.left - this.margin.right;
    this.height = 400 - this.margin.top - this.margin.bottom;
  }

  defaultComparator(first, second, property) {
    return first[property] < second[property] ? -1 : 1;
  }

  componentDidMount() {
    this.drawChart();
  }

  drawChart = () => {
    // default field for sorting
    let fieldForSorting = "createdAt";

    // This is a temporary solution, as it is better to sort the data on the backend
    data.sort((a, b) => this.defaultComparator(a, b, fieldForSorting));

    var svg = d3.select("#line-chart")
      .append("svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .attr('fill', 'transparent')
      .append("g")
      .attr("transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")")

    var x = d3.scaleTime()
      .domain(d3.extent(data, function (d) { return d.createdAt; }))
      .range([0, this.width]);

    svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x));

    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function (d) { return +d.total; })])
      .range([this.height, 0]);

    svg.append("g")
      .call(d3.axisLeft(y));

    return svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function (d) { return x(d.createdAt) })
        .y(function (d) { return y(d.total) })
      )
  }

  render() {
    return <div id="line-chart" />
  }
};

export default LineChartContainer;