export class legend {
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

  vertical(data) {
    const { displayAreaWidth, displayAreaHeight } = this.config;
    const coordinates = data.map(d => d);

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => +d[0])])
      .range([0, displayAreaWidth]);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => +d[1])])
      .range([displayAreaHeight, 0]);
    const legend = this.displayGroup.append('g');
    legend
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'legendCircle')
      .attr('cx', d => xScale(d[0]))
      .attr('cy', d => yScale(d[1]))
      .attr('r', d => (d[2] ? d[2] : '3'))
      .attr('opacity', d => (d[3] ? d[3] / 100 : '1'));

    legend
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'legendText');

    return { legend: dataPoints.selectAll('circle') };
  }
}
