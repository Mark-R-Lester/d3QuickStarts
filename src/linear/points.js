export class points {
  constructor(canvas, config) {
    this.config = canvas.config;
    this.displayGroup = canvas.displayGroup;
    this.defaultConfig = {
      radius: 3
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

    coordinates.forEach();

    const dataPoints = this.displayGroup.append('g');
    dataPoints
      .selectAll('circle')
      .data(coordinates)
      .enter()
      .append('circle')
      .attr('class', 'linePoint')
      .attr('cy', d => y(d))
      .attr('r', d => radius);
    return {
      points: dataPoints.selectAll('circle'),
      meta,
      maximise: () => {
        dataPoints
          .selectAll('.linePoint')
          .attr('cy', d => y(d))
          .attr('r', d => radius);
      },
      minimise: () => {
        dataPoints
          .selectAll('.linePoint')
          .attr('cx', d => x(d))
          .attr('cy', d => y(d))
          .attr('r', d => radius);
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

  // horizontalMinimised(data) {
  //   return this.drawPoints({ data, vertical: false, banded: false, minimised: true });
  // }

  // verticalMinimised(data) {
  //   return this.drawPoints({ data, vertical: true, banded: false, minimised: true });
  // }

  // horizontalBandedMinimised(data) {
  //   return this.drawPoints({ data, vertical: false, banded: true, minimised: true });
  // }

  // verticalBandedMinimised(data) {
  //   return this.drawPoints({ data, vertical: true, banded: true, minimised: true });
  // }
}
