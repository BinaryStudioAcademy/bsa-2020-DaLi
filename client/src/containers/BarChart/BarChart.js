import React, { Component } from "react";
import * as d3 from "d3";
import "./BarChart.css";
import { connect } from "react-redux";
import { fetchData } from "./barChartActions";

class BarChart extends Component {
  componentDidMount() {
    this.props.fetchData();
    const svg = d3.select('svg')
  }

  render() {
    return (
      <div id="container">
        <svg />
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
