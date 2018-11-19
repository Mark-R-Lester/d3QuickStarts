import { Core } from '../core/Core.js';
export class BarGroup extends Core {
  constructor(canvas, config) {
    super(canvas);
    this.defaultConfig = {
      colorRange: d3.schemePurples[4],
      padding: 8
    };
    this.resetConfig();
    this.updateConfig(config);
    this.colors = d3
      .scaleOrdinal()
      .domain(d3.range(this.localConfig.colorRange.length))
      .range(this.localConfig.colorRange);
  }

  draw(args) {
    const { min, max, displayAreaWidth, displayAreaHeight } = this.config;
    const { padding } = this.localConfig;
    const { data, grouped, minimised } = args;
    const stackedData = d3.stack().keys(data[0].map((d, i) => i))(data);
    const meta = [];
    const yScale = d3
      .scaleLinear()
      .domain([min, max !== 0 ? max : d3.max(data, d => (grouped ? d3.max(d) : d3.sum(d)))])
      .range([displayAreaHeight, 0]);

    const xBandScale = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([0, displayAreaWidth])
      .paddingInner(padding / 200)
      .paddingOuter(padding / 200);

    const y = d => (grouped ? yScale(d[1] - d[0]) : yScale(d[1]));
    const x = (outer, inner) =>
      grouped ? xBandScale(inner) + (xBandScale.bandwidth() / data[0].length) * outer : xBandScale(inner);
    const height = d => (grouped ? yScale(0) - yScale(d[1] - d[0]) : yScale(d[0]) - yScale(d[1]));
    const width = () => (grouped ? xBandScale.bandwidth() / data[0].length : xBandScale.bandwidth());

    stackedData.forEach((d, outer) => {
      const barIds = d.map(() => `bar${this.guid()}`);
      const data = d.map((d, inner) => {
        return {
          id: barIds[inner],
          class: 'bar',
          x: x(outer, inner),
          y: y(d),
          height: height(d),
          width: width()
        };
      });
      const dataMin = d.map((d, inner) => {
        return {
          id: barIds[inner],
          class: 'bar',
          x: x(outer, inner),
          y: yScale(0),
          height: 0,
          width: width()
        };
      });
      meta.push({
        groupId: `group${outer}`,
        groupClass: 'bargroup',
        barData: data,
        barDataMin: dataMin
      });
    });

    const group = this.displayGroup.append('g');
    const barGroups = group
      .selectAll('.bargroup')
      .data(meta)
      .enter()
      .append('g')
      .attr('class', d => d.groupClass)
      .attr('id', d => d.groupId)
      .attr('fill', (d, i) => this.colors(i));
    barGroups
      .selectAll('rect')
      .data(d => (minimised ? d.barDataMin : d.barData))
      .enter()
      .append('rect')
      .attr('class', d => d.class)
      .attr('id', d => d.id)
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('height', d => d.height)
      .attr('width', d => d.width);

    return {
      bars: barGroups.selectAll('.bar'),
      barGroups,
      group,
      meta,
      minimise: () => {
        const bars = this.displayGroup.selectAll('.bargroup').data(meta);
        bars
          .selectAll('.bar')
          .data(d => d.barDataMin)
          .attr('x', d => d.x)
          .attr('width', d => d.width)
          .transition()
          .duration(3000)
          .attr('y', d => d.y)
          .attr('height', d => d.height);
      },
      maximise: () => {
        const bars = this.displayGroup.selectAll('.bargroup').data(meta);
        bars
          .selectAll('.bar')
          .data(d => d.barData)
          .attr('x', d => d.x)
          .attr('width', d => d.width)
          .transition()
          .duration(3000)
          .attr('y', d => d.y)
          .attr('height', d => d.height);
      }
    };
  }

  grouped(data) {
    return this.draw({ data, grouped: true, minimised: false });
  }

  stacked(data) {
    return this.draw({ data, grouped: false, minimised: false });
  }

  groupedMinimised(data) {
    return this.draw({ data, grouped: true, minimised: true });
  }

  stackedMinimised(data) {
    return this.draw({ data, grouped: false, minimised: true });
  }
}
