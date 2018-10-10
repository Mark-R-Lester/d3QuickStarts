export class canvas {
  static createCanvas(chartName, newConfig) {
    const config = {
      width: 500,
      height: 70,
      marginRight: 7,
      marginLeft: 7,
      marginTop: 15,
      marginBottom: 15,
      max: 0,
      min: 0,
      borderColour: 'lightgray'
    };
    if (newConfig) {
      Object.keys(newConfig).forEach(key => (config[key] = newConfig[key]));
    }
    const scaleValues = config => {
      config.height = (config.width * config.height) / 100;
      config.marginRight = (config.width * config.marginRight) / 100;
      config.marginLeft = (config.width * config.marginLeft) / 100;
      config.marginTop = (config.height * config.marginTop) / 100;
      config.marginBottom = (config.height * config.marginBottom) / 100;
      config.displayAreaHeight = config.height - (config.marginBottom + config.marginTop);
      config.displayAreaWidth = config.width - (config.marginLeft + config.marginRight);
    };
    scaleValues(config);

    const createSVG = chartName => {
      const svg = d3.select(chartName).append('svg');
      svg.attr('width', config.width).attr('height', config.height);
      svg
        .append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', config.width)
        .attr('height', config.height)
        .style('stroke', config.borderColour)
        .style('fill', 'none')
        .style('stroke-width', '2');
      return svg;
    };
    const createDisplayGroup = svg => {
      const displayGroup = svg.append('g');
      displayGroup
        .attr('class', 'displayGroup')
        .attr('border-color', 'red')
        .attr('transform', 'translate(' + config.marginLeft + ',' + config.marginTop + ')')
        .attr('width', config.width - (config.marginLeft + config.marginRight))
        .attr('height', config.height - (config.marginTop + config.marginBottom));
      return displayGroup;
    };
    return { displayGroup: createDisplayGroup(createSVG(chartName)), config };
  }
}
