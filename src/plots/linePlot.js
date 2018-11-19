import { Core } from '../core/Core.js';
export class LinePlot extends Core {
  constructor(canvas, config) {
    super(canvas);
    this.defaultConfig = {
      curve: d3.curveLinear
    };
    this.resetConfig();
    this.updateConfig(config);
  }

  line(coordinates) {
    const { curve } = this.localConfig;
    const { displayAreaWidth, displayAreaHeight } = this.config;
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(coordinates, d => +d[0])])
      .range([0, displayAreaWidth]);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(coordinates, d => +d[1])])
      .range([displayAreaHeight, 0]);
    let line = d3
      .line(coordinates)
      .x(d => xScale(d[0]))
      .y(d => yScale(d[1]))
      .curve(curve);

    let lineGroup = this.displayGroup.append('g');
    lineGroup
      .append('path')
      .attr('class', 'line')
      .attr('d', line(coordinates))
      .attr('stroke', 'black')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('fill-opacity', '0')
      .attr('stroke-width', 1.5);
    return { line: lineGroup.select('.line') };
  }
}
