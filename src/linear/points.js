export class points {
  constructor(canvas, config) {
    this.config = canvas.config;
    this.displayGroup = canvas.displayGroup;
    this.defaultConfig = {};
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

  showPoints(args) {
    const { coordinates, xScale, yScale, xBand, yBand } = args;
    const dataPoints = this.displayGroup.append('g');
    dataPoints
      .selectAll('circle')
      .data(coordinates)
      .enter()
      .append('circle')
      .attr('class', 'linePoint')
      .attr('cx', d => (xBand ? xScale(d[0]) + xScale.bandwidth() / 2 : xScale(d[0])))
      .attr('cy', d => (yBand ? yScale(d[1]) + yScale.bandwidth() / 2 : yScale(d[1])))
      .attr('r', d => '3');
    return { points: dataPoints.selectAll('circle') };
  }

  horizontal(data) {
    const xVals = d3.range(0, this.config.displayAreaWidth, this.config.displayAreaWidth / data.length);
    const coordinates = data.map((yVal, i) => [xVals[i], yVal]);
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(coordinates, d => +d[0])])
      .range([0, this.config.displayAreaWidth]);
    const yScale = d3
      .scaleLinear()
      .domain([this.config.min, this.config.max !== 0 ? this.config.max : d3.max(coordinates, d => +d[1])])
      .range([this.config.displayAreaHeight, 0]);
    return this.showPoints({ coordinates, yScale, xScale });
  }

  vertical(data) {
    const yVals = d3.range(0, this.config.displayAreaHeight, this.config.displayAreaHeight / data.length);
    const coordinates = data.map((xVal, i) => [xVal, yVals[i]]);
    const xScale = d3
      .scaleLinear()
      .domain([this.config.min, this.config.max !== 0 ? this.config.max : d3.max(coordinates, d => +d[0])])
      .range([0, this.config.displayAreaWidth]);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(coordinates, d => +d[1])])
      .range([this.config.displayAreaHeight, 0]);
    return this.showPoints({ coordinates, yScale, xScale });
  }

  horizontalBanded(data) {
    const xVals = d3.range(0, this.config.displayAreaWidth, this.config.displayAreaWidth / data.length);
    const coordinates = data.map((yVal, i) => [xVals[i], yVal]);
    const xScale = d3
      .scaleBand()
      .domain(coordinates.map(coordinate => coordinate[0]))
      .range([0, this.config.displayAreaWidth]);
    const yScale = d3
      .scaleLinear()
      .domain([this.config.min, this.config.max !== 0 ? this.config.max : d3.max(coordinates, d => +d[1])])
      .range([this.config.displayAreaHeight, 0]);
    const xBand = true;
    return this.showPoints({ coordinates, yScale, xScale, xBand });
  }

  verticalBanded(data) {
    const yVals = d3.range(0, this.config.displayAreaHeight, this.config.displayAreaHeight / data.length);
    const coordinates = data.map((xVal, i) => [xVal, yVals[i]]);
    const xScale = d3
      .scaleLinear()
      .domain([this.config.min, this.config.max !== 0 ? this.config.max : d3.max(coordinates, d => +d[0])])
      .range([0, this.config.displayAreaWidth]);
    const yScale = d3
      .scaleBand()
      .domain(coordinates.map(coordinate => coordinate[1]))
      .range([this.config.displayAreaHeight, 0]);
    const yBand = true;
    return this.showPoints({ coordinates, yScale, xScale, yBand });
  }
}
