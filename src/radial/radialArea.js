export class radialArea {
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

  radialArea(dataOuter, dataInner) {
    const angleScale = d3
      .scaleLinear()
      .domain([0, dataOuter.length])
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

    const dataO = dataOuter.slice();
    dataO.push(dataOuter[0]);
    let dataI;
    if (dataInner) {
      dataI = dataInner.slice();
      dataI.push(dataInner[0]);
    }

    const coordinates = dataO.map((item, i) => {
      return [angleScale(i), radialScale(item[0]), radialScale(dataI ? dataI[i][0] : 0)];
    });
    const radialArea = d3
      .radialArea()
      .angle(d => d[0])
      .outerRadius(d => d[2])
      .innerRadius(d => d[1])
      .curve(this.localConfig.curve);
    const area = this.displayGroup.append('g');
    area
      .append('path')
      .attr('d', radialArea(coordinates))
      .attr('fill', 'red')
      .attr('transform', 'translate(' + xAxis(this.localConfig.x) + ',' + yAxis(this.localConfig.y) + ')');
    return { area: area.selectAll('path') };
  }
}
