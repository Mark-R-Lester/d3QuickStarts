export class text {
  constructor(canvas, config) {
    this.config = canvas.config;
    this.displayGroup = canvas.displayGroup;
    this.defaultConfig = {
      font: 'sans-serif',
      fontSize: 4,
      fill: 'black',
      stroke: '',
      alignmentBaseline: 'middle',
      textAnchor: 'middle',
      font: '',
      angle: 0
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

  text(data) {
    const { font, fontSize, stroke, fill, alignmentBaseline, textAnchor } = this.localConfig;
    const xScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, this.config.displayAreaWidth]);
    const yScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, this.config.displayAreaHeight]);

    const text = this.displayGroup.append('g');
    text
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .attr('font', font)
      .attr('fill', fill)
      .attr('stroke', stroke)
      .attr('font-size', yScale(fontSize) + 'px')
      .attr('transform', d => {
        return 'translate(' + [xScale(d[0]), yScale(d[1])] + ')rotate(' + 0 + ')';
      })
      .style('text-anchor', textAnchor)
      .style('alignment-baseline', alignmentBaseline)
      .text(d => d[2]);
    return { text: text.selectAll('text') };
  }
}
