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
      chart = d3.select("svg"),
      { XAxis, YAxis } = this.props.settings.axisData,
      { goal } = this.props.settings.display,
      yDataRange = {
        min: calcMinYDataValue(
          d3.min(this.props.data, (d) => d[this.state.YAxisKey]),
          goal
        ),
        max: calcMaxYDataValue(
          d3.max(this.props.data, (d) => d[this.state.YAxisKey]),
          goal
        ),
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

    const zoom = (chart) => {
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
        chart
          .selectAll(".bars rect")
          .attr("x", (d) => xScale(d[this.state.XAxisKey]))
          .attr("width", xScale.bandwidth());
        chart.selectAll(".x-axis").call(xAxis);
      };

      chart.call(
        d3
          .zoom()
          .scaleExtent([1, 8])
          .translateExtent(extent)
          .extent(extent)
          .on("zoom", zoomed)
      );
    };

    const barsInfo = chart.selectAll().data(this.props.data).join("g");

    chart
      .attr("viewBox", [0, 0, width, height])
      .call(zoom)
      .selectAll()
      .data(this.props.data)
      .join("rect")
      .attr("class", "bar")
      .attr("fill", "#4AA1DE")
      .attr("x", (d) => xScale(d[this.state.XAxisKey]))
      .attr("y", (d) => yScale(d[this.state.YAxisKey]))
      .attr(
        "height",
        (d) => yScale(yDataRange.min) - yScale(d[this.state.YAxisKey])
      )
      .attr("width", xScale.bandwidth())
      .on("mouseenter", (_, index) => {
        d3.selectAll(".bar")
          .filter((_, i) => i !== index)
          .transition()
          .duration(500)
          .attr("opacity", 0.6);

        // const currentBarInfo = barsInfo.filter((_, i) => i === index);

        // currentBarInfo
        //   .append("text")
        //   .attr("class", "bar__info-hover")
        //   .attr("fill", "#333")
        //   .attr(
        //     "x",
        //     (a) => xScale(a[this.state.XAxisKey]) + xScale.bandwidth() / 2 - 75
        //   )
        //   .attr("y", (a) => yScale(a[this.state.YAxisKey]) - 60)
      })
      .on("mouseleave", (_,index) => {
        d3.selectAll(".bar").transition().duration(500).attr("opacity", 1);

        // const currentBarInfo = barsInfo.filter((_, i) => i === index)
        // currentBarInfo.select("rect").remove()
        // currentBarInfo.selectAll("text").remove()
      });

    if (this.props.settings.display.showDataPointsValues) {
      barsInfo
        .append("text")
        .attr("class", "bar__value")
        .attr(
          "x",
          (a) => xScale(a[this.state.XAxisKey]) + xScale.bandwidth() / 2
        )
        .attr("y", (a) => yScale(a[this.state.YAxisKey]) - 20)
        .attr("text-anchor", "middle")
        .text((a) => `${a[this.state.YAxisKey]}`);
    }

    chart.append("g").attr("class", "x-axis").call(xAxis);
    chart.append("g").attr("class", "y-axis").call(yAxis);

    if (YAxis.displayLabel) {
      chart
        .append("text")
        .attr("class", "label")
        .attr("x", -(height / 2) - margin.left)
        .attr("y", margin.left / 4)
        .attr("transform", "rotate(-90)")
        .text(YAxis.label);
    }
    if (XAxis.displayLabel) {
      chart
        .append("text")
        .attr("class", "label")
        .attr("x", width / 2 + margin.bottom)
        .attr("y", height - margin.bottom * 0.2)
        .attr("text-anchor", "middle")
        .text(XAxis.label);
    }

    if (goal.display) {
      const y = yScale(goal.value);
      chart
        .append("line")
        .attr("id", "goal")
        .attr("x1", 0)
        .attr("y1", y)
        .attr("x2", width)
        .attr("y2", y);

      chart
        .append("text")
        .attr("y", y - 10)
        .attr("x", width - 50)
        .attr("text-anchor", "middle")
        .attr("class", "goal__label")
        .text(goal.label);
    }
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

function calcMinYDataValue(minValue, goal) {
  const min = goal.display ? Math.min(minValue, goal.value) : minValue;
  return min > 0 ? min * 0.7 : min * 1.2;
}

function calcMaxYDataValue(maxVal, goal) {
  const max = goal.display ? Math.max(maxVal, goal.value) : maxVal;
  return max > 0 ? max * 1.2 : max * 0.7;
}
