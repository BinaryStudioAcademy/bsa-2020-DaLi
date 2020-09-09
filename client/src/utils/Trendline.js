import * as d3Regression from 'd3-regression';
import * as d3 from 'd3';

export default class TrendlineCreator {
  constructor(trendlineType, trendlineParent, xScale, yScale) {
    this.trendlineType = trendlineType;
    this.trendlineParent = trendlineParent;
    this.xScale = xScale;
    this.yScale = yScale;
  }

  capitalizedTrendlineType() {
    return this.trendlineType.charAt(0).toUpperCase() + this.trendlineType.slice(1);
  }

  render(...args) {
    const methodName = `render${this.capitalizedTrendlineType()}`;
    this[methodName](...args);
  }

  renderLinear(domain, data, { xOffset = 0 }) {
    const linearRegression = d3Regression
      .regressionLinear()
      .x((d) => d[0])
      .y((d) => d[1])
      .domain(domain);

    const lineData = linearRegression(data);
    const line = this.createLine(xOffset);
    this.appendLineToParent(lineData, line);
  }

  renderPolynomial(domain, data, { order = 2, xOffset = 0 }) {
    const polynomialRegression = d3Regression
      .regressionPoly()
      .x((d) => d[0])
      .y((d) => d[1])
      .order(order)
      .domain(domain);

    const lineData = polynomialRegression(data);
    const line = this.createLine(xOffset);
    this.appendLineToParent(lineData, line);
  }

  renderExponential(domain, data, { xOffset = 0 }) {
    const exponentialRegression = d3Regression
      .regressionExp()
      .x((d) => d[0])
      .y((d) => d[1])
      .domain(domain);

    const lineData = exponentialRegression(data);
    const line = this.createLine(xOffset);
    this.appendLineToParent(lineData, line);
  }

  renderLogarithmical(domain, data, { xOffset = 0 }) {
    const logarithmicalRegression = d3Regression
      .regressionLog()
      .x((d) => d[0])
      .y((d) => d[1])
      .domain(domain);

    const lineData = logarithmicalRegression(data);
    const line = this.createLine(xOffset);
    this.appendLineToParent(lineData, line);
  }

  createLine(xOffset) {
    return d3
      .line()
      .x((d) => this.xScale(d[0]) + xOffset)
      .y((d) => this.yScale(d[1]));
  }

  appendLineToParent(lineData, line) {
    this.trendlineParent.append('path').datum(lineData).attr('class', 'trendline').attr('d', line);
  }
}
