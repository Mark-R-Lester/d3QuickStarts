export const barMulti = (() => {
  const createStackedData = data => {
    const range = d3.range(0, data[0].length, 1);
    return d3.stack().keys(range)(data);
  };

  const createColours = n => {
    return d3
      .scaleOrdinal()
      .domain(d3.range(n))
      .range(d3.schemePurples[n]);
  };

  const createConstants = (canvas, data) => {
    const { config } = canvas;
    const constants = {
      yMaxGrouped: d3.max(data, d => d3.max(d)),
      yMaxStacked: d3.max(data, d => d3.sum(d)),
      stackedData: createStackedData(data),
      n: data[0].length
    };
    constants.yGrouped = d3
      .scaleLinear()
      .domain([0, constants.yMaxGrouped])
      .range([config.displayAreaHeight(), 0]);

    constants.yStacked = d3
      .scaleLinear()
      .domain([0, constants.yMaxStacked])
      .range([config.displayAreaHeight(), 0]);

    constants.xBandScale = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([0, config.displayAreaWidth()])
      .paddingInner(0.08);

    return constants;
  };

  const createBars = (displayGroup, constants) => {
    const color = createColours(constants.n);
    const bars = displayGroup
      .selectAll('.series')
      .data(constants.stackedData)
      .enter()
      .append('g')
      .attr('fill', (d, i) => color(i));

    const bar = bars
      .selectAll('rect')
      .data(d => d)
      .enter()
      .append('rect');

    return bars;
  };

  return {
    stacked: (canvas, data) => {
      const { displayGroup } = canvas;
      const constants = createConstants(canvas, data);
      const bars = createBars(displayGroup, constants);
      bars.data(constants.stackedData);
      bars
        .selectAll('rect')
        .data(d => d)
        .attr('y', d => constants.yStacked(d[1]))
        .attr('height', d => constants.yStacked(d[0]) - constants.yStacked(d[1]))
        .attr('x', (d, i) => constants.xBandScale(i))
        .attr('width', constants.xBandScale.bandwidth());
      return bars;
    },

    grouped: (canvas, data) => {
      const { displayGroup } = canvas;
      const constants = createConstants(canvas, data);
      const bars = createBars(displayGroup, constants);
      bars.data(constants.stackedData);
      const bar = bars
        .selectAll('rect')
        .data(d => d)
        .attr('x', function(d, i) {
          return (
            constants.xBandScale(i) + (constants.xBandScale.bandwidth() / constants.n) * this.parentNode.__data__.key
          );
        })
        .attr('width', constants.xBandScale.bandwidth() / constants.n)
        .attr('y', d => constants.yGrouped(d[1] - d[0]))
        .attr('height', d => constants.yGrouped(0) - constants.yGrouped(d[1] - d[0]));
    },

    // stackedSwoosh: (displayGroup, data) => {
    //   const constants = createConstants(data);
    //   const bars = createBars(displayGroup, data, constants.stackedData);
    //   bars.data(constants.stackedData);
    //   const bar = bars
    //     .selectAll('rect')
    //     .data(d => d)
    //     .attr('y', config.displayAreaHeight())
    //     .attr('height', 0)
    //     .attr('x', (d, i) => constants.xBandScale(i))
    //     .attr('width', constants.xBandScale.bandwidth());
    //   bar
    //     .transition()
    //     .delay((d, i) => i * 60)
    //     .attr('y', d => constants.yStacked(d[1]))
    //     .attr('height', d => constants.yStacked(d[0]) - constants.yStacked(d[1]));
    //   return bars;
    // },

    // groupedSwoosh: (displayGroup, data) => {
    //   const constants = createConstants(data);
    //   const bars = createBars(displayGroup, data, constants.stackedData);
    //   bars.data(constants.stackedData);
    //   const bar = bars
    //     .selectAll('rect')
    //     .data(d => d)
    //     .attr('y', config.displayAreaHeight())
    //     .attr('height', 0)
    //     .attr('x', function(d, i) {
    //       return (
    //         constants.xBandScale(i) + (constants.xBandScale.bandwidth() / constants.n) * this.parentNode.__data__.key
    //       );
    //     })
    //     .attr('width', constants.xBandScale.bandwidth() / constants.n);
    //   bar
    //     .transition()
    //     .delay((d, i) => i * 60)
    //     .attr('y', d => constants.yGrouped(d[1] - d[0]))
    //     .attr('height', d => constants.yGrouped(0) - constants.yGrouped(d[1] - d[0]));
    // },

    // groupedTransitionalSwoosh: function(displayGroup, data) {
    //   let grouped = false;
    //   const constants = createConstants(data);
    //   const bars = this.stackedSwoosh(displayGroup, data);
    //   bars.data(constants.stackedData);

    //   const bar = bars.selectAll('rect').data(d => d);
    //   const transition = displayGroup.append('g');
    //   transition
    //     .append('rect')
    //     .attr('class', 'transRec')
    //     .attr('x', 0)
    //     .attr('y', -config.marginTop() * 0.5)
    //     .attr('width', config.marginTop() * 0.3)
    //     .attr('height', config.marginTop() * 0.3)
    //     .attr('fill', 'steelblue')
    //     .on('click', transitionGroupedStacked);
    //   transition
    //     .append('text')
    //     .attr('class', 'transText')
    //     .attr('x', config.marginTop() * 0.4)
    //     .attr('y', -config.marginTop() * 0.35)
    //     .attr('dy', '0.32em')
    //     .attr('dy', '0.32em')
    //     .text('Grouped')
    //     .style('font-size', config.marginTop() * 0.3 + 'px');

    //   function transitionGroupedStacked() {
    //     if (grouped) {
    //       transitionStacked();
    //       transition.select('.transText').text('Grouped');
    //       grouped = false;
    //     } else {
    //       transitionGrouped();
    //       transition.select('.transText').text('Stacked');
    //       grouped = true;
    //     }
    //   }

    //   function transitionGrouped() {
    //     bar
    //       .transition()
    //       .duration(500)
    //       .delay((d, i) => i * 10)
    //       .attr('x', function(d, i) {
    //         return (
    //           constants.xBandScale(i) + (constants.xBandScale.bandwidth() / constants.n) * this.parentNode.__data__.key
    //         );
    //       })
    //       .attr('width', constants.xBandScale.bandwidth() / constants.n)
    //       .transition()
    //       .attr('y', d => constants.yGrouped(d[1] - d[0]))
    //       .attr('height', d => constants.yGrouped(0) - constants.yGrouped(d[1] - d[0]));
    //   }

    //   function transitionStacked() {
    //     bar
    //       .transition()
    //       .duration(500)
    //       .delay((d, i) => i * 10)
    //       .attr('y', d => constants.yStacked(d[1]))
    //       .attr('height', d => constants.yStacked(d[0]) - constants.yStacked(d[1]))
    //       .transition()
    //       .attr('x', (d, i) => constants.xBandScale(i))
    //       .attr('width', constants.xBandScale.bandwidth());
    //   }
    // },

    addTextToCells: function(displayGroup, data, bars) {
      let bar = bars
        .selectAll('g')
        .data(d => d)
        .enter()
        .append('text')
        .attr('class', 'cellText')
        .attr('x', d => xScale(d.x))
        .attr('y', d => yScale(d.y))
        .attr('font-size', '10px')
        .style('fill', 'black')
        .text(d => d.text);
      bar.exit().remove();
    }
  };
})();
