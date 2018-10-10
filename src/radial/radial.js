export class radial {
  constructor(canvas, config) {
    this.config = canvas.config;
    this.displayGroup = canvas.displayGroup;
    this.defaultConfig = {
      outerRadius: 100,
      innerRadius: 50,
      padAngle: 0,
      cornerRadius: 0,
      padRadius: 0,
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

  radial(data, innerRadius, outerRadius) {
    const xAxis = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, this.config.displayAreaWidth]);
    const yAxis = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, this.config.displayAreaHeight]);
    const bandData = (data, padAngle) => {
      let shares = 0;
      data.forEach(d => {
        shares = shares + d[0];
      });
      if (data.length < 2) {
        padAngle = 0;
      }
      const angle = (Math.PI * 2) / shares;
      let startAngle = 0;
      return data.map((d, i) => {
        const data = d;
        const index = i;
        const value = d[1] ? d[1] : d[0];
        const endAngle = startAngle + angle * d[0];
        const res = {
          data,
          index,
          value,
          startAngle: startAngle + padAngle / 2,
          endAngle: endAngle - padAngle / 2
        };
        startAngle = endAngle;
        return res;
      });
    };
    const path = d3
      .arc()
      .cornerRadius(yAxis(this.localConfig.cornerRadius / 2))
      .outerRadius(yAxis(outerRadius / 2))
      .innerRadius(yAxis(innerRadius / 2));
    const arcs = this.displayGroup.append('g');
    const arc = arcs
      .selectAll('.arc')
      .data(bandData(data, this.localConfig.padAngle))
      .enter()
      .append('g')
      .attr('class', 'arc')
      .attr('stroke', 'black')
      .attr('transform', 'translate(' + xAxis(this.localConfig.x) + ',' + yAxis(this.localConfig.y) + ')');
    arc
      .append('path')
      .attr('d', path)
      .attr('fill', (d, i) => this.colors(d.data[1] ? d.data[1] : i));
    return { slices: arcs.selectAll('.arc') };
  }

  pie(data) {
    return this.radial(data, 0, this.localConfig.outerRadius);
  }

  doughnut(data) {
    return this.radial(data, this.localConfig.innerRadius, this.localConfig.outerRadius);
  }
}
