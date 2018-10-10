export class radialLine {
  constructor(canvas, config) {
    this.config = canvas.config;
    this.displayGroup = canvas.displayGroup;
    this.defaultConfig = {
      curve: d3.curveLinear,
      x: 50,
      y: 50,
      max: 50
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

  radialLine(data) {
    const angleScale = d3
      .scaleLinear()
      .domain([0, data.length])
      .range([0, 2 * Math.PI]);
    const radialScale = d3
      .scaleLinear()
      .domain([0, this.localConfig.max])
      .range([0, this.config.displayAreaHeight / 2]);
    const xAxis = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, this.config.displayAreaWidth]);
    const yAxis = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, this.config.displayAreaHeight]);

    const cdata = data.slice();
    cdata.push(data[0]);
    const coordinates = cdata.map((item, i) => [angleScale(i), radialScale(item[0])]);

    const radialLine = d3.radialLine().curve(this.localConfig.curve);
    const line = this.displayGroup.append('g');
    line
      .append('path')
      .attr('d', radialLine(coordinates))
      .attr('fill', 'none')
      .attr('transform', 'translate(' + xAxis(this.localConfig.x) + ',' + yAxis(this.localConfig.y) + ')');
    return { line };
  }
}
