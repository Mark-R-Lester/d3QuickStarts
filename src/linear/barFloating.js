import { Core } from '../core/Core.js';
export class BarFloating extends Core {
  constructor(canvas, config) {
    super(canvas);
    this.defaultConfig = {
      padding: 8,
      colorDomain: d3.range(4),
      colorRange: ['purple']
    };
    this.resetConfig();
    this.updateConfig(config);
    this.colors = d3
      .scaleOrdinal()
      .domain(this.localConfig.colorDomain)
      .range(this.localConfig.colorRange);
  }

  draw(args) {
    const { min, max, displayAreaWidth, displayAreaHeight } = this.config;
    const { padding } = this.localConfig;
    const { data, vertical, minimised } = args;
    const meta = [];
    const bandStepScale = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([0, vertical ? displayAreaHeight : displayAreaWidth]);
    const bandWidthScale = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([0, vertical ? displayAreaHeight : displayAreaWidth])
      .padding(padding / 100);
    const heightScale = d3
      .scaleLinear()
      .domain([min, max !== 0 ? max : d3.max(data, d => d[1])])
      .range([0, vertical ? displayAreaWidth : displayAreaHeight]);

    const barSpaceing = (d, i) => {
      const adjustmentToCorrectD3 = (bandStepScale.step() - bandWidthScale.bandwidth()) / 2;
      return bandStepScale(i) + adjustmentToCorrectD3;
    };
    const x = (d, i) => (vertical ? heightScale(d[0]) : barSpaceing(d, i));
    const y = (d, i) => (vertical ? barSpaceing(d, i) : displayAreaHeight - heightScale(d[1]));
    const height = d => (vertical ? bandWidthScale.bandwidth() : heightScale(d[1] - d[0]));
    const width = d => (vertical ? heightScale(d[1] - d[0]) : bandWidthScale.bandwidth());
    const color = (d, i) => this.colors(d[1] ? d[1] : i);

    data.forEach((d, i) => {
      const barData = {
        x: x(d, i),
        y: y(d, i),
        height: height(d),
        width: width(d),
        color: color(d, i)
      };
      const barDataMin = {
        x: x(d, i),
        y: displayAreaHeight,
        height: 0,
        width: width(d),
        color: color(d, i)
      };
      meta.push({
        class: 'bar',
        id: `bar-${this.guid()}`,
        barData,
        barDataMin
      });
    });
    const group = this.displayGroup.append('g');
    group
      .selectAll('.bar')
      .data(meta)
      .enter()
      .append('rect')
      .attr('class', d => d.class)
      .attr('id', d => d.id)
      .attr('x', d => (minimised ? d.barDataMin.x : d.barData.x))
      .attr('y', d => (minimised ? d.barDataMin.y : d.barData.y))
      .attr('width', d => (minimised ? d.barDataMin.width : d.barData.width))
      .attr('height', d => (minimised ? d.barDataMin.height : d.barData.height))
      .attr('fill', d => (minimised ? d.barDataMin.color : d.barData.color));
    return {
      bars: group.selectAll(`.${meta[0].class}`),
      group,
      meta,
      minimise: () => {
        group
          .selectAll(`.${meta[0].class}`)
          .data(meta)
          .transition()
          .duration(3000)
          .attr('height', d => d.barDataMin.height)
          .attr('y', d => d.barDataMin.y);
      },
      maximise: () => {
        group
          .selectAll(`.${meta[0].class}`)
          .data(meta)
          .transition()
          .duration(3000)
          .attr('height', d => d.barData.height)
          .attr('y', d => d.barData.y);
      }
    };
  }

  horizontal(data) {
    return this.draw({ data, vertical: false, minimised: false });
  }

  vertical(data) {
    return this.draw({ data, vertical: true, minimised: false });
  }

  horizontalMinimised(data) {
    return this.draw({ data, vertical: false, minimised: true });
  }

  verticalMinimised(data) {
    return this.draw({ data, vertical: true, minimised: true });
  }
}
