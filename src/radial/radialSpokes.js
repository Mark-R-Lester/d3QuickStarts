export class radialSpokes {
  constructor(canvas, config) {
    this.config = canvas.config;
    this.displayGroup = canvas.displayGroup;
    this.defaultConfig = {
      radius: 100,
      innerRadius: 0,
      x: 50,
      y: 50,
      colour: 'black',
      strokeWidth: 0.4
    };
    this.localConfig = {};
    this.resetConfig();
    this.updateConfig(config);
  }

  resetConfig() {
    Object.keys(this.defaultConfig).forEach(key => (this.localConfig[key] = this.defaultConfig[key]));
  }

  updateConfig(config) {
    config = config ? config : {};
    Object.keys(config).forEach(key => (this.localConfig[key] = config[key]));
  }

  spokes(data, shrunken) {
    const { radius, innerRadius, x, y, colour, strokeWidth } = this.localConfig;
    const { displayAreaHeight, displayAreaWidth } = this.config;
    const xCenter = (displayAreaWidth / 100) * x;
    const yCenter = (displayAreaHeight / 100) * y;
    const meta = [];

    data.map((d, i) => {
      const angle = ((Math.PI * 2) / data.length) * i;
      const outerHypotenuse = ((displayAreaHeight / 2) * radius) / 100;
      const innerHypotenuse = ((displayAreaHeight / 2) * innerRadius) / 100;
      const outerX = Math.sin(angle) * outerHypotenuse + xCenter;
      const outerY = Math.cos(angle) * outerHypotenuse + yCenter;
      const innerX = Math.sin(angle) * innerHypotenuse + xCenter;
      const innerY = Math.cos(angle) * innerHypotenuse + yCenter;
      meta[i] = {
        lineData: [[innerX, innerY], [outerX, outerY]],
        lineDataMin: [[innerX, innerY], [innerX, innerY]]
      };
    });

    const line = d3
      .line()
      .x(d => d[0])
      .y(d => d[1]);

    const lineGroup = this.displayGroup.append('g');
    meta.forEach((d, i) => {
      d.id = 'axisSpoke' + i;
      lineGroup
        .append('path')
        .attr('class', 'axisSpoke')
        .attr('id', d.id)
        .attr('d', line(shrunken ? d.lineDataMin : d.lineData))
        .attr('stroke', colour)
        .attr('fill-opacity', '0')
        .attr('stroke-width', strokeWidth);
    });

    return {
      spokes: lineGroup.selectAll('.axisSpoke'),
      meta,
      maximise: () => {
        lineGroup
          .selectAll('.axisSpoke')
          .data(meta.map(d => d.lineData))
          .transition()
          .duration(3000)
          .attr('d', line);
      },
      minimise: () => {
        lineGroup
          .selectAll('.axisSpoke')
          .data(meta.map(d => d.lineDataMin))
          .transition()
          .duration(3000)
          .attr('d', line);
      }
    };
  }

  spokesMinimised(data) {
    return this.spokes(data, true);
  }
}
