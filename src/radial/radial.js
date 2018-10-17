export class radial {
  constructor(canvas, config) {
    this.config = canvas.config;
    this.displayGroup = canvas.displayGroup;
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

  radial(args) {
    const meta = [];
    const { data, pie, minimised } = args;
    const { outerRadius, innerRadius, padAngle, cornerRadius, x, y, min, max } = this.localConfig;
    const xAxis = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, this.config.displayAreaWidth]);
    const yAxis = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, this.config.displayAreaHeight]);

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
          arcId: 'arc' + i,
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
    const arcs = this.displayGroup.append('g');
    arcs
      .selectAll('.arc')
      .data(meta)
      .enter()
      .append('path')
      .attr('class', 'arc')
      .attr('id', d => d.arcId)
      .attr('stroke', 'black')
      .attr('transform', 'translate(' + xAxis(x) + ',' + yAxis(y) + ')')
      .attr('d', d => (minimised ? path(d.arcDataMin) : path(d.arcData)))
      .attr('fill', (d, i) =>
        this.colors(
          minimised ? (d.arcDataMin.data[1] ? d.arcDataMin.data[1] : i) : d.arcData.data[1] ? d.arcData.data[1] : i
        )
      );

    return {
      slices: arcs.selectAll('.arc'),
      meta,
      minimise: () => {
        arcs
          .selectAll('.arc')
          .data(meta)
          // .transition()
          // .duration(10000)
          .attr('d', d => path(d.arcDataMin));
      },
      maximise: () => {
        arcs
          .selectAll('.arc')
          .data(meta)
          // .transition()
          // .duration(10000)
          .attr('d', d => path(d.arcData));
      }
    };
  }

  pie(data) {
    const args = { data, pie: true, minimised: false };
    return this.radial(args);
  }

  doughnut(data) {
    const args = { data, pie: false, minimised: false };
    return this.radial(args);
  }

  pieMinimised(data) {
    const args = { data, pie: true, minimised: true };
    return this.radial(args);
  }

  doughnutMinimised(data) {
    const args = { data, pie: false, minimised: true };
    return this.radial(args);
  }
}
