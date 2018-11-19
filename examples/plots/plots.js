var coordinates1 = [
  [0, 0],
  [10, 62],
  [30, 25],
  [30, 20],
  [40, 35],
  [42, 33],
  [39, 35],
  [40, 35],
  [50, 50],
  [60, 50],
  [70, 20],
  [80, 24],
  [90, 25],
  [100, 25],
  [100, 35],
  [98, 33],
  [110, 80],
  [106, 83],
  [120, 6],
  [120, 6]
];

var coordinates2 = [
  [0, 0],
  [15, 50],
  [35, 40],
  [35, 29],
  [45, 39],
  [32, 39],
  [29, 30],
  [45, 35],
  [44, 50],
  [20, 50],
  [80, 20],
  [100, 24],
  [93, 20],
  [110, 90],
  [160, 30],
  [65, 30],
  [156, 86],
  [105, 63],
  [120, 61],
  [120, 61]
];

var coordinates3 = [
  [0, 0, 10, 20],
  [10, 62, 10, 20],
  [30, 25, 10, 20],
  [30, 20, 10, 20],
  [40, 35, 10, 20],
  [42, 33, 10, 20],
  [39, 35, 50, 20],
  [40, 35, 10, 20],
  [50, 50, 20, 20],
  [60, 50, 10, 20],
  [70, 20, 15, 20],
  [80, 24, 10, 20],
  [90, 25, 56, 20],
  [100, 25, 10, 20],
  [100, 35, 10, 20],
  [98, 33, 10, 20],
  [110, 80, 30, 20],
  [106, 83, 10, 20],
  [120, 6, 11, 20],
  [120, 6, 10, 20],
  [15, 50, 10, 20],
  [35, 40, 10, 20],
  [35, 29, 10, 20],
  [45, 39, 13, 20],
  [32, 39, 10, 20],
  [29, 30, 50, 20],
  [45, 35, 14, 20],
  [44, 50, 20, 20],
  [20, 50, 33, 20],
  [80, 20, 13, 20],
  [100, 24, 10, 20],
  [93, 20, 10, 20],
  [110, 90, 10, 20],
  [160, 30, 16, 20],
  [65, 30, 10, 20],
  [156, 86, 30, 20],
  [105, 63, 70, 20],
  [120, 61, 5, 20],
  [120, 61, 12, 20]
];

var coordinates5 = [
  [0, 0],
  [10, 20],
  [30, 20],
  [40, 30],
  [50, 20],
  [60, 50],
  [70, 0],
  [80, 20],
  [90, 20],
  [100, 30],
  [110, 20],
  [120, 50]
];

var coordinates6 = [
  [0, 0],
  [10, 62],
  [30, 25],
  [40, 35],
  [50, 50],
  [60, 50],
  [70, 20],
  [80, 24],
  [90, 25],
  [100, 35],
  [110, 80],
  [120, 6]
];

var coordinates7 = [[40, 40], [60, 60], [80, 40], [60, 20], [40, 40]];

this.curves = [
  d3.curveLinear,
  d3.curveStep,
  d3.curveStepBefore,
  d3.curveStepAfter,
  d3.curveBasis,
  d3.curveCardinal,
  d3.curveMonotoneX,
  d3.curveCatmullRom
];

const qs = d3qs;
const canvas1 = qs.canvas.createCanvas('#chart');
plotter1 = new qs.ScatterPlot(canvas1);
plotter1.addDataPoints(coordinates3).points.attr('fill', 'steelblue');

const canvas2 = qs.canvas.createCanvas('#chart');
plotter2 = new qs.ScatterPlot(canvas2);
plotter2
  .addDataPoints(coordinates2)
  .points.attr('fill', 'orange')
  .selectAll('circle')
  .on('mouseover', function(d) {
    d3.select(this)
      .transition()
      .duration(500)
      .attr('r', '50')
      .attr('fill', 'steelblue');
  })
  .on('mouseout', function(d) {
    d3.select(this)
      .transition()
      .duration(500)
      .attr('r', '4')
      .attr('fill', 'orange');
  });
plotter2.addDataPoints(coordinates1);

const canvas5 = qs.canvas.createCanvas('#chart');
plotter5 = new qs.LinePlot(canvas5, { curve: d3.curveCardinal });
plotter5.line(coordinates5, 0);

const canvas6 = qs.canvas.createCanvas('#chart');
plotter6 = new qs.LinePlot(canvas6);
plotter6.line(coordinates6, 7);

const canvas7 = qs.canvas.createCanvas('#chart');
plotter7 = new qs.LinePlot(canvas7);
plotter7.line(coordinates5, 6);
plotter7.line(coordinates7).line.attr('stroke', 'red');
