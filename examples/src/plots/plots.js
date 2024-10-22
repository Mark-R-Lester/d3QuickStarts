var coordinates1 = [
  {X: 0, y: 0},
  {X: 10, y: 62},
  {X: 30, y: 25},
  {X: 30, y: 20},
  {X: 40, y: 35},
  {X: 42, y: 33},
  {X: 39, y: 35},
  {X: 40, y: 35},
  {X: 50, y: 50},
  {X: 60, y: 50},
  {X: 70, y: 20},
  {X: 80, y: 24},
  {X: 90, y: 25},
  {X: 100, y: 25},
  {X: 100, y: 35},
  {X: 98, y: 33},
  {X: 110, y: 80},
  {X: 106, y: 83},
  {X: 120, y: 6},
  {X: 120, y: 6}
]

var coordinates2 = [
  {X: 0, y: 0},
  {X: 15, y: 50},
  {X: 35, y: 40},
  {X: 35, y: 29},
  {X: 45, y: 39},
  {X: 32, y: 39},
  {X: 29, y: 30},
  {X: 45, y: 35},
  {X: 44, y: 50},
  {X: 20, y: 50},
  {X: 80, y: 20},
  {X: 100, y: 24},
  {X: 93, y: 20},
  {X: 110, y: 90},
  {X: 160, y: 30},
  {X: 65, y: 30},
  {X: 156, y: 86},
  {X: 105, y: 63},
  {X: 120, y: 61},
  {X: 120, y: 61}
]

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
]

var coordinates5 = [
  {X: 0, y: 0},
  {X: 10, y: 20},
  {X: 30, y: 20},
  {X: 40, y: 30},
  {X: 50, y: 20},
  {X: 60, y: 50},
  {X: 70, y: 0},
  {X: 80, y: 20},
  {X: 90, y: 20},
  {X: 100, y: 30},
  {X: 110, y: 20},
  {X: 120, y: 50}
]

var coordinates6 = [
  {X: 0, y: 0},
  {X: 10, y: 62},
  {X: 30, y: 25},
  {X: 40, y: 35},
  {X: 50, y: 50},
  {X: 60, y: 50},
  {X: 70, y: 20},
  {X: 80, y: 24},
  {X: 90, y: 25},
  {X: 100, y: 35},
  {X: 110, y: 80},
  {X: 120, y: 6}
]

var coordinates7 = [{X: 40, y: 40}, {X: 60, y: 60}, {X: 80, y: 40}, {X: 60, y: 20}, {X: 40, y: 40}]

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
