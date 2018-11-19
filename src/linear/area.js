import { Core } from '../core/Core.js';

export class Area extends Core {
  constructor(canvas, config) {
    super(canvas);
    this.defaultConfig = {
      curve: d3.curveLinear,
      color: 'red'
    };
    this.resetConfig();
    this.updateConfig(config);
  }

  draw(args) {
    const { min, max, displayAreaWidth, displayAreaHeight } = this.config;
    const { curve, color } = this.localConfig;
    const { data1, data0, minimised } = args;
    const meta = [];

    const populateMeta = (data1, data0) => {
      const xVals = d3.range(0, displayAreaWidth, displayAreaWidth / data1.length);
      meta.push({
        class: 'area',
        id: `area-${this.guid()}`,
        areaData: data1.map((d, i) => [xVals[i], d[0], data0 ? data0[i][0] : 0]),
        areaDataMin: data1.map((d, i) => [xVals[i], 0, 0])
      });
    };
    populateMeta(data1, data0);

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(meta[0].areaData.map(d => d[0]))])
      .range([0, displayAreaWidth]);
    const yScale = d3
      .scaleLinear()
      .domain([min, max !== 0 ? max : d3.max(meta[0].areaData.map(d => d[1]))])
      .range([displayAreaHeight, 0]);

    const area = () =>
      d3
        .area()
        .x(d => xScale(d[0]))
        .y1(d => yScale(d[1]))
        .y0(d => yScale(d[2]))
        .curve(curve);

    const group = this.displayGroup.append('g');
    group
      .append('path')
      .attr('class', meta[0].class)
      .attr('id', meta[0].id)
      .attr('d', area()(minimised ? meta[0].areaDataMin : meta[0].areaData))
      .attr('fill', color);
    return {
      area: group.select(`.${meta[0].class}`),
      group,
      meta,
      minimise: () => {
        group
          .selectAll(`.${meta[0].class}`)
          .transition()
          .duration(3000)
          .attr('d', area()(meta[0].areaDataMin));
      },
      maximise: () => {
        group
          .selectAll(`.${meta[0].class}`)
          .transition()
          .duration(3000)
          .attr('d', area()(meta[0].areaData));
      }
    };
  }

  horizontal(data1, data0) {
    return this.draw({ data1, data0, minimised: false });
  }

  horizontalMinimised(data1, data0) {
    return this.draw({ data1, data0, minimised: true });
  }
}
