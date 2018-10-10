export class area {
  constructor(canvas, config) {
    this.config = canvas.config;
    this.displayGroup = canvas.displayGroup;
    this.defaultConfig = {
      curve: d3.curveLinear,
      color: 'red'
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

  horizontal(y1, y0) {
    const { min, max } = this.config;
    const xVals = d3.range(0, this.config.displayAreaWidth, this.config.displayAreaWidth / y1.length);
    const coordinates = y1.map((yVal, i) => [xVals[i], yVal, y0 ? y0[i] : 0]);
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(coordinates, d => +d[0])])
      .range([0, this.config.displayAreaWidth]);
    const yScale = d3
      .scaleLinear()
      .domain([min, max !== 0 ? max : d3.max(coordinates, d => +d[1])])
      .range([this.config.displayAreaHeight, 0]);
    const area = d3
      .area(coordinates)
      .x(d => xScale(d[0]))
      .y1(d => yScale(d[1]))
      .y0(d => yScale(d[2]));
    area.curve(this.localConfig.curve);
    const areaGroup = this.displayGroup.append('g');
    areaGroup
      .append('path')
      .attr('class', 'area')
      .attr('d', area(coordinates))
      .attr('fill', this.localConfig.color);
    return { area: areaGroup.select('.area') };
  }
}
