import { Core } from '../core/core.js';
export class radialArea extends Core {
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

  radialArea(dataOuter, dataInner, minimise) {
    const { x, y, curve } = this.localConfig;
    const { min, max, displayAreaHeight, displayAreaWidth } = this.config;
    const meta = [];
    const angleScale = d3
      .scaleLinear()
      .domain([0, dataOuter.length])
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

    const dataOuterCopy = dataOuter.slice();
    dataOuterCopy.push(dataOuter[0]);
    let dataInnerCopy;
    if (dataInner) {
      dataInnerCopy = dataInner.slice();
      dataInnerCopy.push(dataInner[0]);
    }
    meta.push({
      class: 'radialArea',
      id: 'radialArea',
      areaDataMin: dataOuterCopy.map((d, i) => [angleScale(i), radialScale(min), radialScale(min)]),
      areaData: dataOuterCopy.map((d, i) => [
        angleScale(i),
        radialScale(d[0]),
        radialScale(dataInnerCopy ? dataInnerCopy[i][0] : min)
      ])
    });

    const radialArea = d3
      .radialArea()
      .angle(d => d[0])
      .outerRadius(d => d[2])
      .innerRadius(d => d[1])
      .curve(curve);
    const area = this.displayGroup.append('g');
    area
      .append('path')
      .attr('class', meta[0].class)
      .attr('id', meta[0].id)
      .attr('d', radialArea(minimise ? meta[0].areaDataMin : meta[0].areaData))
      .attr('fill', 'red')
      .attr('transform', 'translate(' + xAxis(x) + ',' + yAxis(y) + ')');
    return {
      group: area,
      area: area.selectAll('path'),
      meta,
      maximise: () => {
        area
          .selectAll('.radialArea')
          .transition()
          .duration(3000)
          .attr('d', radialArea(meta[0].areaData));
      },
      minimise: () => {
        area
          .selectAll('.radialArea')
          .transition()
          .duration(3000)
          .attr('d', radialArea(meta[0].areaDataMin));
      }
    };
  }

  radialAreaMinimised(dataOuter, dataInner) {
    return this.radialArea(dataOuter, dataInner, true);
  }
}
