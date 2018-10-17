export class radialPoints {
  constructor(canvas, config) {
    this.config = canvas.config;
    this.displayGroup = canvas.displayGroup;
    this.defaultConfig = {
      x: 50,
      y: 50,
      pointRadius: 3
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
    const { x, y, pointRadius } = this.localConfig;
    const { min, max, displayAreaHeight, displayAreaWidth } = this.config;
    const angleScale = d3
      .scaleLinear()
      .domain([0, data.length])
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

    const coordinates = data.map((d, i) => {
      const radians = angleScale(i);
      const hypotenuse = radialScale(d[0]);
      const x = Math.sin(radians) * hypotenuse;
      const y = Math.cos(radians) * hypotenuse * -1;
      return [x, y];
    });

    const dataPoints = this.displayGroup.append('g');
    dataPoints
      .selectAll('circle')
      .data(coordinates)
      .enter()
      .append('circle')
      .attr('class', 'radialPoint')
      .attr('cx', d => d[0])
      .attr('cy', d => d[1])
      .attr('r', d => pointRadius)
      .attr('transform', 'translate(' + xAxis(x) + ',' + yAxis(y) + ')');
    return { points: dataPoints.selectAll('circle') };
  }
}
