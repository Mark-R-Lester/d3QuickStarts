export class bar {
  constructor(canvas, config) {
    this.config = canvas.config;
    this.displayGroup = canvas.displayGroup;
    this.defaultConfig = {
      padding: 8,
      colorDomain: d3.range(4),
      colorRange: d3.schemePurples[4]
    };
    this.localConfig = {};
    this.resetConfig();
    this.updateConfig(config);
    this.colors = d3
      .scaleOrdinal()
      .domain(this.localConfig.colorDomain)
      .range(this.localConfig.colorRange);
  }

  resetConfig() {
    Object.keys(this.defaultConfig).forEach(key => (this.localConfig[key] = this.defaultConfig[key]));
  }

  updateConfig(config) {
    config = config ? config : {};
    Object.keys(config).forEach(key => (this.localConfig[key] = config[key]));
  }

  horizontal(data) {
    const { min, max } = this.config;
    const bandStepScale = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([0, this.config.displayAreaWidth]);
    const bandWidthScale = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([0, this.config.displayAreaWidth])
      .padding(this.localConfig.padding / 100);
    const heightScale = d3
      .scaleLinear()
      .domain([min, max !== 0 ? max : d3.max(data, d => d[0])])
      .range([0, this.config.displayAreaHeight]);
    const bars = this.displayGroup
      .append('g')
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => {
        const adjustmentToCorrectD3 = (bandStepScale.step() - bandWidthScale.bandwidth()) / 2;
        let res = bandStepScale(i);
        return res + adjustmentToCorrectD3;
      })
      .attr('width', bandWidthScale.bandwidth())
      .attr('y', d => this.config.displayAreaHeight - heightScale(d[0]))
      .attr('height', d => heightScale(d[0]))
      .attr('fill', (d, i) => this.colors(d[1] ? d[1] : i));
    return { bars: bars.selectAll('.bar') };
  }

  vertical(data) {
    const { min, max } = this.config;
    const bandStepScale = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([0, this.config.displayAreaHeight]);
    const bandWidthScale = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([0, this.config.displayAreaHeight])
      .padding(this.localConfig.padding / 100);
    const heightScale = d3
      .scaleLinear()
      .domain([min, max !== 0 ? max : d3.max(data)])
      .range([0, this.config.displayAreaWidth]);
    const bars = this.displayGroup
      .append('g')
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('y', (d, i) => {
        const adjustmentToCorrectD3 = (bandStepScale.step() - bandWidthScale.bandwidth()) / 2;
        let res = bandStepScale(i);
        return res + adjustmentToCorrectD3;
      })
      .attr('height', bandWidthScale.bandwidth())
      .attr('x', 0)
      .attr('width', d => heightScale(d[0]))
      .attr('fill', (d, i) => this.colors(d[1] ? d[1] : i));
    return { bars: bars.selectAll('.bar') };
  }
}
