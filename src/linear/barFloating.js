export class barFloating {
  constructor(canvas, config) {
    this.config = canvas.config;
    this.displayGroup = canvas.displayGroup;
    this.defaultConfig = {
      padding: 8,
      colorDomain: d3.range(4),
      colorRange: ['purple']
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

  bars(args) {
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
        id: 'bar' + i,
        barData,
        barDataMin
      });
    });

    const bars = this.displayGroup.append('g');
    bars
      .selectAll('.bar')
      .data(meta)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('id', d => d.id)
      .attr('x', d => (minimised ? d.barDataMin.x : d.barData.x))
      .attr('y', d => (minimised ? d.barDataMin.y : d.barData.y))
      .attr('width', d => (minimised ? d.barDataMin.width : d.barData.width))
      .attr('height', d => (minimised ? d.barDataMin.height : d.barData.height))
      .attr('fill', d => (minimised ? d.barDataMin.color : d.barData.color));
    return {
      selectionGroup: bars,
      bars: bars.selectAll('.bar'),
      meta,
      minimise: () => {
        bars
          .selectAll('.bar')
          .data(meta)
          .transition()
          .duration(3000)
          .attr('height', d => d.barDataMin.height)
          .attr('y', d => d.barDataMin.y);
      },
      maximise: () => {
        bars
          .selectAll('.bar')
          .data(meta)
          .transition()
          .duration(3000)
          .attr('height', d => d.barData.height)
          .attr('y', d => d.barData.y);
      }
    };
  }

  horizontal(data) {
    return this.bars({ data, vertical: false, minimised: false });
  }

  vertical(data) {
    return this.bars({ data, vertical: true, minimised: false });
  }

  horizontalMinimised(data) {
    return this.bars({ data, vertical: false, minimised: true });
  }

  verticalMinimised(data) {
    return this.bars({ data, vertical: true, minimised: true });
  }
}
