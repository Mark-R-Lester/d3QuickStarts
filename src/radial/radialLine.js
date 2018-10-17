export class radialLine {
  constructor(canvas, config) {
    this.config = canvas.config;
    this.displayGroup = canvas.displayGroup;
    this.defaultConfig = {
      curve: d3.curveLinear,
      x: 50,
      y: 50
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
    const { x, y, curve } = this.localConfig;
    const { min, max, displayAreaHeight, displayAreaWidth } = this.config;
    const angleScale = d3
      .scaleLinear()
      .domain([0, data.length])
      .range([0, 2 * Math.PI]);
    const radialScale = d3
      .scaleLinear()
      .domain([min, max])
      .range([0, displayAreaHeight / 2]);
    const xAxis = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, displayAreaWidth]);
    const yAxis = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, displayAreaHeight]);

    const cdata = data.slice();
    cdata.push(data[0]);
    const coordinates = cdata.map((item, i) => [angleScale(i), radialScale(item[0])]);

    const radialLine = d3.radialLine().curve(curve);
    const line = this.displayGroup.append('g');
    line
      .append('path')
      .attr('d', radialLine(coordinates))
      .attr('fill', 'none')
      .attr('transform', 'translate(' + xAxis(x) + ',' + yAxis(y) + ')');
    return { line };
  }
}
