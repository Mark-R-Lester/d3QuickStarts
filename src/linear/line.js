export class line {
  constructor(canvas, config) {
    this.config = canvas.config;
    this.displayGroup = canvas.displayGroup;
    this.defaultConfig = {
      curve: d3.curveLinear
    };
    this.localConfig = {};
    this.resetConfig();
    this.updateConfig(config);
  }

  resetConfig() {
    Object.keys(this.defaultConfig).forEach(key => (this.localConfig[key] = this.defaultConfig[key]));
  }

  updateConfig(config) {
    config = config ? config : {};
    Object.keys(config).forEach(key => (this.localConfig[key] = config[key]));
  }

  drawLine(args) {
    const { coordinates, line } = args;
    const lineGroup = this.displayGroup.append('g');
    line.curve(this.localConfig.curve);
    lineGroup
      .append('path')
      .attr('class', 'line')
      .attr('d', line(coordinates))
      .attr('stroke', 'black')
      .attr('fill-opacity', '0');
    return { line: lineGroup.select('.line') };
  }

  horizontal(data) {
    const { displayAreaHeight, displayAreaWidth, min, max } = this.config;
    const xVals = d3.range(0, displayAreaWidth, displayAreaWidth / data.length);
    const coordinates = data.map((d, i) => [xVals[i], d[0]]);
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(coordinates.map(d => d[0]))])
      .range([0, displayAreaWidth]);
    const yScale = d3
      .scaleLinear()
      .domain([min, max !== 0 ? max : d3.max(coordinates.map(d => d[1]))])
      .range([displayAreaHeight, 0]);
    const line = d3
      .line(coordinates)
      .x(d => xScale(d[0]))
      .y(d => yScale(d[1]));
    return this.drawLine({ coordinates, line });
  }

  vertical(data) {
    const { displayAreaHeight, displayAreaWidth, min, max } = this.config;
    const yVals = d3.range(0, displayAreaHeight, displayAreaHeight / data.length);
    const coordinates = data.map((d, i) => [d[0], yVals[i]]);
    const xScale = d3
      .scaleLinear()
      .domain([min, max !== 0 ? max : d3.max(coordinates.map(d => d[0]))])
      .range([0, displayAreaWidth]);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(coordinates, d => +d[1])])
      .range([displayAreaHeight, 0]);
    const line = d3
      .line(coordinates)
      .x(d => xScale(d[0]))
      .y(d => yScale(d[1]));
    return this.drawLine({ coordinates, line });
  }

  horizontalBanded(data) {
    const { displayAreaHeight, displayAreaWidth, min, max } = this.config;
    const xVals = d3.range(0, displayAreaWidth, displayAreaWidth / data.length);
    const coordinates = data.map((d, i) => [xVals[i], d[0]]);
    const xScale = d3
      .scaleBand()
      .domain(coordinates.map(coordinate => coordinate[0]))
      .range([0, displayAreaWidth]);
    const yScale = d3
      .scaleLinear()
      .domain([min, max !== 0 ? max : d3.max(coordinates.map(d => d[1]))])
      .range([displayAreaHeight, 0]);
    const line = d3
      .line(coordinates)
      .x(d => xScale(d[0]) + xScale.bandwidth() / 2)
      .y(d => yScale(d[1]));
    return this.drawLine({ coordinates, line });
  }

  verticalBanded(data) {
    const { displayAreaHeight, displayAreaWidth, min, max } = this.config;
    const yVals = d3.range(0, displayAreaHeight, displayAreaHeight / data.length);
    const coordinates = data.map((d, i) => [d[0], yVals[i]]);
    const xScale = d3
      .scaleLinear()
      .domain([min, max !== 0 ? max : d3.max(coordinates.map(d => d[0]))])
      .range([0, displayAreaWidth]);
    const yScale = d3
      .scaleBand()
      .domain(coordinates.map(coordinate => coordinate[1]))
      .range([displayAreaHeight, 0]);
    const line = d3
      .line(coordinates)
      .x(d => xScale(d[0]))
      .y(d => yScale(d[1]) + yScale.bandwidth() / 2);
    return this.drawLine({ coordinates, line });
  }
}
