import { Core } from '../core/Core.js';
export class ScatterPlot extends Core {
  constructor(canvas, config) {
    super(canvas);
    this.defaultConfig = {};
    this.resetConfig();
    this.updateConfig(config);
  }

  addDataPoints(data) {
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => +d[0])])
      .range([0, this.config.displayAreaWidth]);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => +d[1])])
      .range([this.config.displayAreaHeight, 0]);
    const dataPoints = this.displayGroup.append('g');
    dataPoints
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'linePoint')
      .attr('cx', d => xScale(d[0]))
      .attr('cy', d => yScale(d[1]))
      .attr('r', d => (d[2] ? d[2] : '3'))
      .attr('opacity', d => (d[3] ? d[3] / 100 : '1'));
    return { points: dataPoints };
  }
}
