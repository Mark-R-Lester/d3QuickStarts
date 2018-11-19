import { Core } from '../core/Core.js';
export class Points extends Core {
  constructor(canvas, config) {
    super(canvas);
    this.defaultConfig = {
      radius: 3
    };
    this.resetConfig();
    this.updateConfig(config);
  }

  drawPoints(args) {
    const { displayAreaHeight, displayAreaWidth, min, max } = this.config;
    const { radius } = this.localConfig;
    const { data, vertical, banded, minimised } = args;
    const meta = [];
    const pointSpacing = d3.range(0, displayAreaWidth, displayAreaWidth / data.length);
    const coordinates = data.map((d, i) => (vertical ? [d[0], pointSpacing[i]] : [pointSpacing[i], d[0]]));
    const dataScale = d3
      .scaleLinear()
      .domain(
        vertical
          ? [min, max !== 0 ? max : d3.max(coordinates.map(d => +d[0]))]
          : [min, max !== 0 ? max : d3.max(coordinates.map(d => +d[1]))]
      )
      .range(vertical ? [0, displayAreaWidth] : [displayAreaHeight, 0]);

    let spacingScale;
    if (banded) {
      spacingScale = d3
        .scaleBand()
        .domain(vertical ? coordinates.map(d => d[1]) : coordinates.map(d => d[0]))
        .range(vertical ? [this.config.displayAreaHeight, 0] : [0, this.config.displayAreaWidth]);
    } else {
      spacingScale = d3
        .scaleLinear()
        .domain(vertical ? [0, d3.max(coordinates.map(d => d[1]))] : [0, d3.max(coordinates.map(d => d[0]))])
        .range(vertical ? [displayAreaHeight, 0] : [0, displayAreaWidth]);
    }
    const x = d => {
      const space = banded ? spacingScale(d[0]) + spacingScale.bandwidth() / 2 : spacingScale(d[0]);
      return vertical ? dataScale(d[0]) : space;
    };
    const y = d => {
      const space = banded ? spacingScale(d[1]) + spacingScale.bandwidth() / 2 : spacingScale(d[1]);
      return vertical ? space : dataScale(d[1]);
    };

    coordinates.forEach((d, i) => {
      meta.push({
        class: 'point',
        id: `point${this.guid()}`,
        pointDataMin: [x(d), dataScale(0)],
        pointData: [x(d), y(d)],
        radiusMin: 0,
        radius: radius
      });
    });

    const group = this.displayGroup.append('g');
    group
      .selectAll('circle')
      .data(meta)
      .enter()
      .append('circle')
      .attr('class', d => d.class)
      .attr('id', d => d.id)
      .attr('cy', d => {
        return minimised ? d.pointDataMin[1] : d.pointData[1];
      })
      .attr('cx', d => {
        return minimised ? d.pointDataMin[0] : d.pointData[0];
      })
      .attr('r', minimised ? 0 : radius);
    return {
      points: group.selectAll(`.${meta[0].class}`),
      group,
      meta,
      maximise: () => {
        group
          .selectAll(`.${meta[0].class}`)
          .data(meta)
          .transition()
          .duration(3000)
          .attr('cy', d => {
            return d.pointData[1];
          })
          .attr('r', radius);
      },
      minimise: () => {
        group
          .selectAll(`.${meta[0].class}`)
          .data(meta)
          .transition()
          .duration(3000)
          .attr('cy', d => d.pointDataMin[1])
          .attr('r', 0);
      }
    };
  }

  horizontal(data) {
    return this.drawPoints({ data, vertical: false, banded: false, minimised: false });
  }

  vertical(data) {
    return this.drawPoints({ data, vertical: true, banded: false, minimised: false });
  }

  horizontalBanded(data) {
    return this.drawPoints({ data, vertical: false, banded: true, minimised: false });
  }

  verticalBanded(data) {
    return this.drawPoints({ data, vertical: true, banded: true, minimised: false });
  }

  horizontalMinimised(data) {
    return this.drawPoints({ data, vertical: false, banded: false, minimised: true });
  }

  verticalMinimised(data) {
    return this.drawPoints({ data, vertical: true, banded: false, minimised: true });
  }

  horizontalBandedMinimised(data) {
    return this.drawPoints({ data, vertical: false, banded: true, minimised: true });
  }

  verticalBandedMinimised(data) {
    return this.drawPoints({ data, vertical: true, banded: true, minimised: true });
  }
}
