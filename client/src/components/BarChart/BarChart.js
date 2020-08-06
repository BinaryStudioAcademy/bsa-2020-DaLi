/* eslint-disable */

import React from "react";
import * as d3 from "d3";
import d3Tip from "d3-tip";

import { findLineByLeastSquares } from "../../utils/trendline";
import "./BarChart.css";
import { useEffect } from "react";

function BarChart(props) {
  useEffect(() => {  
    const { margin, width, height } = props.settings.chart,
    { goal, showTrendLine, showDataPointsValues } = props.settings.display,
    XAxis = props.settings.axisData.XAxis,
    YAxis = props.settings.axisData.YAxis,
    chart = d3.select("svg"),
    { data } = props,
    yDataRange = {
      min: calcMinYDataValue(
        d3.min(data, (d) => d[YAxis.key]),
        goal
      ),
      max: calcMaxYDataValue(
        d3.max(data, (d) => d[YAxis.key]),
        goal
      ),
    };

    const tip  = d3Tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(d => `
      <div><span>${XAxis.label}:</span> <span style='color:white'>${d[XAxis.key]}</span></div>
      <div><span>${YAxis.label}:</span> <span style='color:white'>${d[YAxis.key]}</span></div>
    `)
    chart.call(tip)
    .attr("viewBox", [0, 0, width, height])
  
    const xScale = d3.scaleBand()
    .domain(data.map((d) => d[XAxis.key]))
    .range([margin.left, width - margin.right])
    .padding(0.1);
  
    const yScale = d3.scaleLinear()
    .domain([yDataRange.min, yDataRange.max])
    .range([height - margin.bottom, margin.top ]);
  
    const xAxis = (g) => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale).tickSizeOuter(0));
    
    const yAxis = (g) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(yScale));
  
    const barsInfo = chart.selectAll()
    .data(data)
    .join("g");
  
    chart.append("g")
    .attr("class", "bars")
    .selectAll()
    .data(data)
    .join("rect")
    .attr("class", "bar")
    .attr("fill", "#4AA1DE")
    .attr("x", (d) => xScale(d[XAxis.key]))
    .attr("y", (d) => yScale(d[YAxis.key]))
    .attr("height", (d) => yScale(yDataRange.min) - yScale(d[YAxis.key]))
    .attr("width", xScale.bandwidth())
    .on("mouseenter", (_, index) => {
      d3.selectAll(".bar")
      .filter((_, i) => i !== index)
      .transition()
      .duration(500)
      .attr("opacity", 0.6);
    })
    .on("mouseleave", () => {
      d3.selectAll(".bar")
      .transition()
      .duration(500)
      .attr("opacity", 1);
    })
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);
  
    if (showTrendLine && data.length) {
      const xValues = data.map((d) => d[XAxis.key]);
      const yValues = data.map((d) => d[YAxis.key]);
      const lineCoords = findLineByLeastSquares(xValues, yValues);
      
      chart.select(".bars")
      .append("line")
      .attr("id", "trendline")
      .attr("x1", 0)
      .attr("y1", yScale(lineCoords.start.y))
      .attr("x2", width)
      .attr("y2", yScale(lineCoords.end.y));
    }
  
    if (showDataPointsValues) {
      barsInfo.append("text")
      .attr("class", "bar__value")
      .attr("x", (a) => xScale(a[XAxis.key]) + xScale.bandwidth() / 2)
      .attr("y", (a) => yScale(a[YAxis.key]) - 20)
      .attr("text-anchor", "middle")
      .text((a) => `${a[YAxis.key]}`);
    }
  
    chart.append("g").attr("class", "x-axis").call(xAxis);
    chart.append("g").attr("class", "y-axis").call(yAxis);
  
    if (YAxis.displayLabel) {
      chart.append("text")
      .attr("class", "label")
      .attr("x", -(height / 2) - margin.left)
      .attr("y", margin.left / 4)
      .attr("transform", "rotate(-90)")
      .text(YAxis.label);
    }
  
    if (XAxis.displayLabel) {
      chart.append("text")
      .attr("class", "label")
      .attr("x", width / 2 + margin.bottom)
      .attr("y", height - margin.bottom * 0.2)
      .attr("text-anchor", "middle")
      .text(XAxis.label);
    }
  
    if (goal.display) {
      const y = yScale(goal.value);
      chart.append("line")
      .attr("id", "goal")
      .attr("x1", 0)
      .attr("y1", y)
      .attr("x2", width)
      .attr("y2", y);
  
      chart.append("text")
      .attr("y", y - 10)
      .attr("x", width - 50)
      .attr("text-anchor", "middle")
      .attr("class", "goal__label")
      .text(goal.label);
    }
  }, [])
  

  return (
    <div id="container">
      <svg />
    </div>
  );
}

export default BarChart;

function calcMinYDataValue(minValue, goal) {
  const min = goal.display ? Math.min(minValue, goal.value) : minValue;
  return min > 0 ? min * 0.7 : min * 1.2;
}

function calcMaxYDataValue(maxVal, goal) {
  const max = goal.display ? Math.max(maxVal, goal.value) : maxVal;
  return max > 0 ? max * 1.2 : max * 0.7;
}
