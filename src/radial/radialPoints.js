import { Core } from '../core/Core.js';
export class RadialPoints extends Core {
  constructor(canvas, config) {
    super(canvas);
    this.defaultConfig = {
      x: 50,
      y: 50,
      pointRadius: 1.2
    };
    this.resetConfig();
    this.updateConfig(config);
  }

  radialPoints(data, minimised) {
    const { x, y, pointRadius } = this.localConfig;
    const { min, max, displayAreaHeight, displayAreaWidth } = this.config;
    const meta = [];
    const angleScale = d3
      .scaleLinear()
      .domain([0, data.length])
      .range([0, 2 * Math.PI]);
    const radialScale = d3
      .scaleLinear()
      .domain([min, max])
      .range([0, displayAreaHeight / 2]);
    const xScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, displayAreaWidth]);
    const yScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, displayAreaHeight]);

    data.forEach((d, i) => {
      const radians = angleScale(i);
      const hypotenuse = radialScale(d[0]);
      const x = Math.sin(radians) * hypotenuse;
      const y = Math.cos(radians) * hypotenuse * -1;

      meta.push({
        id: `radialPoint${this.guid()}`,
        class: 'radialPoint',
        pointData: [x, y],
        pointDataMin: [0, 0]
      });
    });

    const dataPoints = this.displayGroup.append('g');
    dataPoints
      .selectAll('circle')
      .data(meta)
      .enter()
      .append('circle')
      .attr('class', d => d.class)
      .attr('id', d => d.id)
      .attr('cx', d => (minimised ? d.pointDataMin[0] : d.pointData[0]))
      .attr('cy', d => (minimised ? d.pointDataMin[1] : d.pointData[1]))
      .attr('r', minimised ? 0 : yScale(pointRadius))
      .attr('transform', `translate(${xScale(x)}, ${yScale(y)})`);
    return {
      points: dataPoints.selectAll('circle'),
      meta,
      maximise: () => {
        dataPoints
          .selectAll(`.${meta[0].class}`)
          .data(meta)
          .transition()
          .duration(3000)
          .attr('cx', d => d.pointData[0])
          .attr('cy', d => d.pointData[1])
          .attr('r', yScale(pointRadius));
      },
      minimise: () => {
        dataPoints
          .selectAll(`.${meta[0].class}`)
          .data(meta)
          .transition()
          .duration(3000)
          .attr('cx', d => d.pointDataMin[0])
          .attr('cy', d => d.pointDataMin[1])
          .attr('r', yScale(pointRadius));
      }
    };
  }

  radialPointsMinimised(data) {
    return this.radialPoints(data, true);
  }
}
