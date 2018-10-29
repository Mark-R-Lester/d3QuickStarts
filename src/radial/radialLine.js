import { Core } from '../core/core.js';
export class radialLine extends Core {
  constructor(canvas, config) {
    super(canvas);
    this.defaultConfig = {
      curve: d3.curveLinear,
      x: 50,
      y: 50
    };
    this.resetConfig();
    this.updateConfig(config);
  }

  radialLine(data, minimise) {
    const { x, y, curve } = this.localConfig;
    const { min, max, displayAreaHeight, displayAreaWidth } = this.config;
    const meta = [];
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

    const dataCopy = data.slice();
    dataCopy.push(data[0]);

    meta.push({
      class: 'circularLine',
      id: 'circularLine',
      lineDataMin: dataCopy.map((d, i) => [angleScale(i), 0]),
      lineData: dataCopy.map((d, i) => [angleScale(i), radialScale(d[0])])
    });

    const radialLine = d3.radialLine().curve(curve);
    const line = this.displayGroup.append('g');
    line
      .append('path')
      .attr('class', meta[0].class)
      .attr('id', meta[0].id)
      .attr('d', radialLine(minimise ? meta[0].lineDataMin : meta[0].lineData))
      .attr('fill', 'none')
      .attr('transform', 'translate(' + xAxis(x) + ',' + yAxis(y) + ')');
    return {
      line,
      meta,
      maximise: () => {
        line
          .selectAll('.circularLine')
          .transition()
          .duration(3000)
          .attr('d', radialLine(meta[0].lineData));
      },
      minimise: () => {
        line
          .selectAll('.circularLine')
          .transition()
          .duration(3000)
          .attr('d', radialLine(meta[0].lineDataMin));
      }
    };
  }

  radialLineMinimised(data) {
    return this.radialLine(data, true);
  }
}
