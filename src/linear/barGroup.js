export class barGroup {
  constructor(canvas, config) {
    this.config = canvas.config;
    this.displayGroup = canvas.displayGroup;
    this.defaultConfig = {
      colorRange: d3.schemePurples[4],
      padding: 8
    };

    this.localConfig = {};
    this.resetConfig();
    this.updateConfig(config);
    this.colors = d3
      .scaleOrdinal()
      .domain(d3.range(this.localConfig.colorRange.length))
      .range(this.localConfig.colorRange);
  }

  resetConfig() {
    Object.keys(this.defaultConfig).forEach(key => (this.localConfig[key] = this.defaultConfig[key]));
  }

  updateConfig(config) {
    config = config ? config : {};
    Object.keys(config).forEach(key => (this.localConfig[key] = config[key]));
  }

  createConstants(data) {
    const createStackedData = data => {
      const range = d3.range(0, data[0].length, 1);
      return d3.stack().keys(range)(data);
    };
    const constants = {
      stackedData: createStackedData(data)
    };
    return constants;
  }

  createBars(constants) {
    const bars = this.displayGroup
      .selectAll('.series')
      .data(constants.stackedData)
      .enter()
      .append('g')
      .attr('fill', (d, i) => this.colors(i));

    const bar = bars
      .selectAll('rect')
      .data(d => d)
      .enter()
      .append('rect');
    return bars;
  }

  stacked(data) {
    const { min, max } = this.config;
    const constants = this.createConstants(data);
    const yScale = d3
      .scaleLinear()
      .domain([min, max !== 0 ? max : d3.max(data, d => d3.sum(d))])
      .range([this.config.displayAreaHeight, 0]);
    const xBandScale = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([0, this.config.displayAreaWidth])
      .paddingInner(this.localConfig.padding / 200)
      .paddingOuter(this.localConfig.padding / 200);
    const bars = this.createBars(constants);
    bars.data(constants.stackedData);
    bars
      .selectAll('rect')
      .data(d => d)
      .attr('y', d => yScale(d[1]))
      .attr('height', d => yScale(d[0]) - yScale(d[1]))
      .attr('x', (d, i) => xBandScale(i))
      .attr('width', xBandScale.bandwidth());
    return { bars: bars.selectAll('rect') };
  }

  grouped(data) {
    const { min, max } = this.config;
    const constants = this.createConstants(data);
    const yScale = d3
      .scaleLinear()
      .domain([min, max !== 0 ? max : d3.max(data, d => d3.max(d))])
      .range([this.config.displayAreaHeight, 0]);
    const xBandScale = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([0, this.config.displayAreaWidth])
      .paddingInner(this.localConfig.padding / 200)
      .paddingOuter(this.localConfig.padding / 200);
    const bars = this.createBars(constants);
    bars.data(constants.stackedData);
    const bar = bars
      .selectAll('rect')
      .data(d => d)
      .attr('x', function(d, i) {
        return xBandScale(i) + (xBandScale.bandwidth() / data[0].length) * this.parentNode.__data__.key;
      })
      .attr('width', xBandScale.bandwidth() / data[0].length)
      .attr('y', d => yScale(d[1] - d[0]))
      .attr('height', d => yScale(0) - yScale(d[1] - d[0]));
    return { bars: bars.selectAll('rect') };
  }
}
