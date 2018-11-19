import { Core } from '../core/Core.js';
export class RadialSpokes extends Core {
  constructor(canvas, config) {
    super(canvas);
    this.defaultConfig = {
      radius: 100,
      innerRadius: 0,
      x: 50,
      y: 50,
      colour: 'black',
      strokeWidth: 0.4
    };
    this.resetConfig();
    this.updateConfig(config);
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
        class: 'axisSpoke',
        id: `axisSpoke${this.guid()}`,
        lineData: [[innerX, innerY], [outerX, outerY]],
        lineDataMin: [[innerX, innerY], [innerX, innerY]]
      };
    });

    const line = d3
      .line()
      .x(d => d[0])
      .y(d => d[1]);

    const group = this.displayGroup.append('g');
    group
      .selectAll('path')
      .data(meta)
      .enter()
      .append('path')
      .attr('class', d => d.class)
      .attr('id', d => d.id)
      .attr('d', d => line(shrunken ? d.lineDataMin : d.lineData))
      .attr('stroke', colour)
      .attr('fill-opacity', '0')
      .attr('stroke-width', strokeWidth);

    return {
      spokes: group.selectAll(`.${meta[0].class}`),
      group,
      meta,
      maximise: () => {
        group
          .selectAll(`.${meta[0].class}`)
          .data(meta.map(d => d.lineData))
          .transition()
          .duration(3000)
          .attr('d', line);
      },
      minimise: () => {
        group
          .selectAll(`.${meta[0].class}`)
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
