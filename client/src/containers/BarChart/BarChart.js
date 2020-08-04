import React, { Component } from "react";
import * as d3 from "d3";
import "./BarChart.css";
import { connect } from "react-redux";
import { fetchData } from "./barChartActions";

class BarChart extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  state = {
    margin: {
      top: 40,
      right: 40,
      bottom: 60,
      left: 60,
    },
    height: 600,
    width: 1000,
    XAxisKey: this.props.settings.axisData.XAxis.key,
    YAxisKey: this.props.settings.axisData.YAxis.key,
  };

  renderChart() {
    const { margin, width, height } = this.state,
      svg = d3.select("svg"),
      yDataRange = {
        min: d3.min(this.props.data, (d) => d[this.state.YAxisKey]) * 0.7,
        max: d3.max(this.props.data, (d) => d[this.state.YAxisKey]) * 1.2,
      };

    const xScale = d3
      .scaleBand()
      .domain(this.props.data.map((d) => d[this.state.XAxisKey]))
      .range([
        this.state.margin.left,
        this.state.width - this.state.margin.right,
      ])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([yDataRange.min, yDataRange.max])
      .range([
        this.state.height - this.state.margin.bottom,
        this.state.margin.top,
      ]);

    const xAxis = (g) =>
      g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale).tickSizeOuter(0));

    const yAxis = (g) =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale));

    const zoom = (svg) => {
      const extent = [
        [margin.left, margin.top],
        [width - margin.right, height - margin.top],
      ];

      const zoomed = () => {
        xScale.range(
          [margin.left, width - margin.right].map((d) =>
            d3.event.transform.applyX(d)
          )
        );
        svg
          .selectAll(".bars rect")
          .attr("x", (d) => xScale(d[this.state.XAxisKey]))
          .attr("width", xScale.bandwidth());
        svg.selectAll(".x-axis").call(xAxis);
      };

      svg.call(
        d3
          .zoom()
          .scaleExtent([1, 8])
          .translateExtent(extent)
          .extent(extent)
          .on("zoom", zoomed)
      );
    };

    svg
      .attr("viewBox", [0, 0, width, height])
      .call(zoom)
      .append("g")
      .attr("class", "bars")
      .attr("fill", "steelblue")
      .selectAll("rect")
      .data(this.props.data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d[this.state.XAxisKey]))
      .attr("y", (d) => yScale(d[this.state.YAxisKey]))
      .attr(
        "height",
        (d) => yScale(yDataRange.min) - yScale(d[this.state.YAxisKey])
      )
      .attr("width", xScale.bandwidth())
      .on("mouseenter", (actual, index) => {
        const bars = d3.selectAll(".bar")
        .transition()
        .duration(500)
        .attr("opacity", 0.6);

        const currentBar = bars.filter((_,i) => i === index)
        .attr('opacity', 1)
        .attr('x', (a) => xScale(a[this.state.XAxisKey]) - 5)
        .attr('width', xScale.bandwidth() + 10)

        const y = yScale(actual[this.state.YAxisKey])

        svg.append('line')
          .attr('id', 'limit')
          .attr('x1', 0)
          .attr('y1', y)
          .attr('x2', width)
          .attr('y2', y)
      })
      .on("mouseleave",(_, index) => {
        d3.selectAll('.bar')
        .transition()
        .duration(500)
        .attr('opacity', 1)

        d3.selectAll(".bar")
        .filter((_,i) => i === index)
        .transition()
        .attr('x', (a) => xScale(a[this.state.XAxisKey]))
        .attr('width', xScale.bandwidth())

        svg.selectAll('#limit').remove()
      });

    svg.append("g").attr("class", "x-axis").call(xAxis);
    svg.append("g").attr("class", "y-axis").call(yAxis);

    svg
      .append("text")
      .attr("class", "label")
      .attr("x", -(height / 2) - margin.left)
      .attr("y", margin.left / 4)
      .attr("transform", "rotate(-90)")
      .text(this.state.YAxisKey);

    svg
      .append("text")
      .attr("class", "label")
      .attr("x", width / 2 + margin.bottom)
      .attr("y", height - margin.bottom * 0.2)
      .attr("text-anchor", "middle")
      .text(this.state.XAxisKey);
  }

  render() {
    return (
      <div id="container">
        <svg />
        {this.renderChart()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.barChart.data,
    settings: state.barChart.settings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchData: () => dispatch(fetchData()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BarChart);
