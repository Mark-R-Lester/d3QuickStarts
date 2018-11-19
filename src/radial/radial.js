import { Core } from '../core/Core.js';
export class Radial extends Core {
  constructor(canvas, config) {
    super(canvas);
    this.defaultConfig = {
      outerRadius: 100,
      innerRadius: 50,
      padAngle: 0,
      cornerRadius: 0,
      x: 50,
      y: 50,
      colorDomain: d3.range(4),
      colorRange: d3.schemePurples[4]
    };
    this.resetConfig();
    this.updateConfig(config);
    this.colors = d3
      .scaleOrdinal()
      .domain(this.localConfig.colorDomain)
      .range(this.localConfig.colorRange);
  }

  draw(args) {
    const { data, pie, minimised } = args;
    const { outerRadius, innerRadius, padAngle, cornerRadius, x, y } = this.localConfig;
    const { displayAreaHeight, displayAreaWidth } = this.config;
    const meta = [];
    const xAxis = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, displayAreaWidth]);
    const yAxis = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, displayAreaHeight]);

    const createMeta = (data, padAngle) => {
      let shares = 0;
      data.forEach(d => {
        shares = shares + d[0];
      });
      if (data.length < 2) {
        padAngle = 0;
      }
      const angle = (Math.PI * 2) / shares;
      let startAngle = 0;
      data.forEach((d, i) => {
        const endAngle = startAngle + angle * d[0];
        meta.push({
          class: `arc`,
          id: `arc${this.guid()}`,
          arcData: {
            data: d,
            index: i,
            value: d[1] ? d[1] : d[0],
            cornerRadius: yAxis(cornerRadius / 2),
            outerRadius: yAxis(outerRadius / 2),
            innerRadius: yAxis(pie ? 0 : innerRadius / 2),
            startAngle: startAngle + padAngle / 2,
            endAngle: endAngle - padAngle / 2
          },
          arcDataMin: {
            data: d,
            index: i,
            value: d[1] ? d[1] : d[0],
            cornerRadius: yAxis(cornerRadius / 2),
            outerRadius: yAxis(outerRadius / 2),
            innerRadius: yAxis(pie ? 0 : innerRadius / 2),
            startAngle: startAngle + padAngle / 2,
            endAngle: startAngle + padAngle / 2 + 0.00001
          }
        });
        startAngle = endAngle;
      });
    };
    createMeta(data, padAngle);

    const path = d3
      .arc()
      .cornerRadius(d => d.cornerRadius)
      .outerRadius(d => d.outerRadius)
      .innerRadius(d => d.innerRadius)
      .startAngle(d => d.startAngle)
      .endAngle(d => d.endAngle);
    const group = this.displayGroup.append('g');

    const interpolate = (d, t, minimise) => {
      t = minimise ? 1 - t : t;
      const tweenedData = {};
      tweenedData.cornerRadius = t * d.cornerRadius;
      tweenedData.outerRadius = t * d.outerRadius;
      tweenedData.innerRadius = t * d.innerRadius;
      tweenedData.startAngle = d.startAngle;
      tweenedData.endAngle = d.endAngle;
      return path(tweenedData);
    };

    group
      .selectAll('.arc')
      .data(meta)
      .enter()
      .append('path')
      .attr('class', d => d.class)
      .attr('id', d => d.id)
      .attr('stroke', 'black')
      .attr('transform', `translate(${xAxis(x)}, ${yAxis(y)})`)
      .attr('d', d => (minimised ? path(d.arcDataMin) : path(d.arcData)))
      .attr('fill', (d, i) =>
        this.colors(
          minimised ? (d.arcDataMin.data[1] ? d.arcDataMin.data[1] : i) : d.arcData.data[1] ? d.arcData.data[1] : i
        )
      );

    return {
      slices: group.selectAll('.arc'),
      group,
      meta,
      minimise: () => {
        group
          .selectAll(`.${meta[0].class}`)
          .data(meta)
          .transition()
          .duration(3000)
          .attrTween('d', d => t => interpolate(d.arcData, t, true));
      },
      maximise: () => {
        group
          .selectAll(`.${meta[0].class}`)
          .data(meta)
          .transition()
          .duration(3000)
          .attrTween('d', d => t => interpolate(d.arcData, t, false));
      }
    };
  }

  pie(data) {
    const args = { data, pie: true, minimised: false };
    return this.draw(args);
  }

  doughnut(data) {
    const args = { data, pie: false, minimised: false };
    return this.draw(args);
  }

  pieMinimised(data) {
    const args = { data, pie: true, minimised: true };
    return this.draw(args);
  }

  doughnutMinimised(data) {
    const args = { data, pie: false, minimised: true };
    return this.draw(args);
  }
}
