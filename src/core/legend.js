import { Core } from './Core.js';
export class Legend extends Core {
  constructor(canvas, config) {
    super(canvas);
    this.defaultConfig = {
      size: 3,
      space: 10,
      x: 0,
      y: 0,
      font: 'sans-serif',
      fill: 'black',
      stroke: '',
      alignmentBaseline: 'middle',
      textAnchor: 'start',
      angle: 0
    };
    this.resetConfig();
    this.updateConfig(config);
  }

  draw(args) {
    const meta = [];
    const { data, minimised } = args;
    const { min, max, displayAreaWidth, displayAreaHeight } = this.config;
    const { size, space, x, y, textFill, textStroke, alignmentBaseline, textAnchor, font } = this.localConfig;

    const xScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, displayAreaWidth]);
    const yScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([displayAreaHeight, 0]);
    const percentScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, displayAreaHeight]);

    meta.push({
      dataMin: data.map((d, i) => {
        return {
          x: xScale(x),
          y: yScale(y + size + space * i),
          tx: xScale(x + size + space),
          ty: yScale(y + size * 0.5 + space * i),
          width: xScale(size),
          height: xScale(size),
          colour: d[0],
          value: d[1]
        };
      }),
      data: data.map((d, i) => {
        return {
          x: xScale(x),
          y: yScale(y + size + space * i),
          tx: xScale(x + size * 1.3),
          ty: yScale(y + space * i),
          width: xScale(size),
          height: xScale(size),
          colour: d[0],
          value: d[1]
        };
      })
    });

    const group = this.displayGroup.append('g');
    group
      .selectAll('.legend')
      .data(minimised ? meta[0].dataMin : meta[0].data)
      .enter()
      .append('rect')
      .attr('class', 'legend')
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('width', d => d.width)
      .attr('height', d => d.height)
      .attr('fill', d => d.colour);

    group
      .selectAll('text')
      .data(minimised ? meta[0].dataMin : meta[0].data)
      .enter()
      .append('text')
      .attr('font', font)
      .attr('fill', textFill)
      .attr('stroke', textStroke)
      .attr('font-size', `${percentScale(size)}px`)
      .attr('transform', d => {
        return `translate(${d.tx}, ${d.ty})rotate(${0})`;
      })
      .style('text-anchor', textAnchor)
      .style('alignment-baseline', alignmentBaseline)
      .text(d => d.value);

    return {
      element: group.selectAll('.element'),
      group,
      meta,
      minimised: () => {},
      maximised: () => {}
    };
  }

  legend(data) {
    return this.draw({ data, minimised: false });
  }

  legendMinimised(data) {
    return this.draw({ data, minimised: true });
  }
}
