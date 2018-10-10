export class radialPoints {
  constructor(canvas, config) {
    this.config = canvas.config;
    this.displayGroup = canvas.displayGroup;
    this.defaultConfig = {
      x: 50,
      y: 50,
      max: 50
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

  radialPoints(data) {
    const { x, y, max } = this.localConfig;
    const radialScale = d3
      .scaleLinear()
      .domain([0, d3.max(data.map(d => d[0]))])
      .range([0, this.config.displayAreaHeight / 2]);

    const coordinates = data => {
      const angle = (Math.PI * 2) / data.length;
      return data.map((d, i) => {
        const radians = angle * i;
        const hypotenuse = radialScale(d[0]);
        const x = Math.sin(radians) * hypotenuse;
        const y = Math.cos(radians) * hypotenuse * -1;
        return [x + this.config.displayAreaWidth / 2, y + this.config.displayAreaHeight / 2];
      });
    };

    const dataPoints = this.displayGroup.append('g');
    dataPoints
      .selectAll('circle')
      .data(coordinates(data))
      .enter()
      .append('circle')
      .attr('class', 'radialPoint')
      .attr('cx', d => d[0])
      .attr('cy', d => d[1])
      .attr('r', d => '3');
    return { points: dataPoints.selectAll('circle') };
  }
}
