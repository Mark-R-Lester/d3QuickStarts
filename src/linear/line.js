import { Core } from '../core/Core.js';
export class Line extends Core {
  constructor(canvas, config) {
    super(canvas);
    this.defaultConfig = {
      curve: d3.curveLinear
    };
    this.resetConfig();
    this.updateConfig(config);
  }

  drawLine(args) {
    const { displayAreaHeight, displayAreaWidth, min, max } = this.config;
    const { data, vertical, banded, minimised } = args;
    const meta = [];
    const xVals = d3.range(0, displayAreaWidth, displayAreaWidth / data.length);
    const yVals = d3.range(0, displayAreaHeight, displayAreaHeight / data.length);
    const coordinates = data.map((d, i) => (vertical ? [d[0], yVals[i]] : [xVals[i], d[0]]));
    const coordinatesMin = data.map((d, i) => (vertical ? [0, yVals[i]] : [xVals[i], 0]));
    meta.push({ class: 'line', id: `line${this.guid()}`, coordinates, coordinatesMin });

    let spacingScale;
    if (banded) {
      spacingScale = d3
        .scaleBand()
        .domain(coordinates.map(coordinate => (vertical ? coordinate[1] : coordinate[0])))
        .range(vertical ? [displayAreaHeight, 0] : [0, displayAreaWidth]);
    } else {
      spacingScale = d3
        .scaleLinear()
        .domain([0, d3.max(coordinates.map(d => (vertical ? d[1] : d[0])))])
        .range(vertical ? [displayAreaHeight, 0] : [0, displayAreaWidth]);
    }
    const dataScale = d3
      .scaleLinear()
      .domain([min, max !== 0 ? max : d3.max(coordinates.map(d => (vertical ? d[0] : d[1])))])
      .range(vertical ? [0, displayAreaWidth] : [displayAreaHeight, 0]);

    const bandingAdjustment = banded ? spacingScale.bandwidth() / 2 : 0;
    const line = d3
      .line(coordinates)
      .x(d => (vertical ? dataScale(d[0]) : spacingScale(d[0]) + bandingAdjustment))
      .y(d => (vertical ? spacingScale(d[1]) + bandingAdjustment : dataScale(d[1])))
      .curve(this.localConfig.curve);

    const group = this.displayGroup.append('g');
    group
      .append('path')
      .attr('class', meta[0].class)
      .attr('id', meta[0].id)
      .attr('d', line(minimised ? coordinatesMin : coordinates))
      .attr('stroke', 'black')
      .attr('fill-opacity', '0');
    return {
      line: group.select(`.${meta[0].class}`),
      group,
      meta,
      minimise: () => {
        group
          .selectAll(`.${meta[0].class}`)
          .transition()
          .duration(3000)
          .attr('d', line(coordinatesMin));
      },
      maximise: () => {
        group
          .selectAll(`.${meta[0].class}`)
          .transition()
          .duration(3000)
          .attr('d', line(coordinates));
      }
    };
  }

  horizontal(data) {
    return this.drawLine({ data, vertical: false, banded: false, minimised: false });
  }

  vertical(data) {
    return this.drawLine({ data, vertical: true, banded: false, minimised: false });
  }

  horizontalBanded(data) {
    return this.drawLine({ data, vertical: false, banded: true, minimised: false });
  }

  verticalBanded(data) {
    return this.drawLine({ data, vertical: true, banded: true, minimised: false });
  }

  horizontalMinimised(data) {
    return this.drawLine({ data, vertical: false, banded: false, minimised: true });
  }

  verticalMinimised(data) {
    return this.drawLine({ data, vertical: true, banded: false, minimised: true });
  }

  horizontalBandedMinimised(data) {
    return this.drawLine({ data, vertical: false, banded: true, minimised: true });
  }

  verticalBandedMinimised(data) {
    return this.drawLine({ data, vertical: true, banded: true, minimised: true });
  }
}
