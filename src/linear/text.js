import { Core } from '../core/Core.js';
export class Text extends Core {
  constructor(canvas, config) {
    super(canvas);
    this.defaultConfig = {
      font: 'sans-serif',
      fontSize: 4,
      fill: 'black',
      stroke: '',
      alignmentBaseline: 'middle',
      textAnchor: 'middle',
      angle: 0
    };
    this.resetConfig();
    this.updateConfig(config);
  }

  text(data) {
    const { font, fontSize, stroke, fill, alignmentBaseline, textAnchor } = this.localConfig;
    const { displayAreaWidth, displayAreaHeight } = this.config;
    const xScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, displayAreaWidth]);
    const yScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, displayAreaHeight]);

    const text = this.displayGroup.append('g');
    text
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .attr('font', font)
      .attr('fill', fill)
      .attr('stroke', stroke)
      .attr('font-size', `${yScale(fontSize)}px`)
      .attr('transform', d => {
        return `translate(${xScale(d[0])}, ${yScale(d[1])})rotate(${0})`;
      })
      .style('text-anchor', textAnchor)
      .style('alignment-baseline', alignmentBaseline)
      .text(d => d[2]);
    return { text: text.selectAll('text') };
  }
}
