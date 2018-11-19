import { Core } from '../core/Core.js';
export class Axis extends Core {
  constructor(canvas, config) {
    super(canvas);
    this.defaultConfig = {
      alignmentBaseline: null,
      tickSize: 6,
      tickSizeInner: 6,
      tickSizeOuter: 0,
      tickPadding: 3,
      fontSize: 5,
      font: 'sans-serif',
      textAngle: 0,
      textAnchor: '',
      textX: null,
      textY: null,
      hideAxisDomain: false,
      x: 0,
      y: 0
    };
    this.resetConfig();
    this.updateConfig(config);
  }

  draw(data, topOrRight, banded, isX) {
    const { min, max, displayAreaWidth, displayAreaHeight } = this.config;
    const {
      x,
      y,
      textX,
      textY,
      tickSize,
      tickSizeInner,
      tickSizeOuter,
      tickPadding,
      font,
      fontSize,
      textAngle,
      textAnchor,
      hideAxisDomain,
      alignmentBaseline
    } = this.localConfig;
    const meta = [];

    let scale;
    const range = isX ? [0, displayAreaWidth] : [displayAreaHeight, 0];
    if (banded) {
      scale = d3
        .scaleBand()
        .domain(data.map(d => d.toString()))
        .range(range);
    } else {
      if (data.some(d => typeof d[0] === 'string' || d[0] instanceof String)) {
        scale = d3
          .scalePoint()
          .domain(data)
          .range(range);
      } else {
        scale = d3
          .scaleLinear()
          .domain([min, max !== 0 ? max : d3.max(data)])
          .range(range);
      }
    }

    let axis;
    let percentRange;
    if (isX) {
      axis = topOrRight ? d3.axisTop(scale) : d3.axisBottom(scale);
      percentRange = topOrRight ? [displayAreaHeight, 0] : [0, displayAreaHeight];
    } else {
      axis = topOrRight ? d3.axisRight(scale) : d3.axisLeft(scale);
      percentRange = topOrRight ? [displayAreaWidth, 0] : [0, displayAreaWidth];
    }
    const textPercentScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, displayAreaHeight]);
    const percentScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range(percentRange);

    const translation = isX
      ? `translate(0, ${displayAreaHeight - percentScale(y)})`
      : `translate(${percentScale(x)}, 0)`;
    axis.tickSize(tickSize);
    axis.tickSizeInner(tickSizeInner);
    axis.tickSizeOuter(tickSizeOuter);
    axis.tickPadding(tickPadding);
    const axisGroup = this.displayGroup
      .append('g')
      .attr('id', 'xAxis')
      .attr('transform', translation)
      .call(axis);
    const axisText = axisGroup.selectAll('text');
    axisText
      .attr('text-anchor', textAnchor)
      .attr('transform', `rotate(${textAngle})`)
      .attr('font-size', textPercentScale(fontSize))
      .attr('font', font)
      .style('alignment-baseline', alignmentBaseline);
    if (textY) {
      axisText.attr('dy', textY);
    }
    if (textX) {
      axisText.attr('dx', textX);
    }
    const axisDomain = axisGroup.select('.domain');
    if (hideAxisDomain) {
      axisDomain.remove();
    }

    return { text: axisText };
  }

  xAxis(data) {
    return this.draw(data, false, false, true);
  }

  xAxisTop(data) {
    return this.draw(data, true, false, true);
  }

  xAxisBottom(data) {
    return this.draw(data, false, false, true);
  }

  xAxisBanded(data) {
    return this.draw(data, false, true, true);
  }

  xAxisBottomBanded(data) {
    return this.draw(data, false, true, true);
  }

  xAxisTopBanded(data) {
    return this.draw(data, true, true, true);
  }

  yAxis(data) {
    return this.draw(data, false, false, false);
  }

  yAxisLeft(data) {
    return this.draw(data, false, false, false);
  }

  yAxisRight(data) {
    return this.draw(data, true, false, false);
  }

  yAxisBanded(data) {
    return this.draw(data, false, true, false);
  }

  yAxisLeftBanded(data) {
    return this.draw(data, false, true, false);
  }

  yAxisRightBanded(data) {
    return this.draw(data, true, true, false);
  }
}
