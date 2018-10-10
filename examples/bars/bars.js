var vals = [[10], [20], [30], [20], [10]];
var vals2 = [[25], [10], [35], [25], [35], [5], [25], [15]];

var vals4 = [[10, 30], [20, 40], [30, 50], [40, 60], [50, 70]];

const vals3 = [
  [10, 20, 16, 23],
  [16, 32, 30, 26],
  [40, 16, 12, 16],
  [10, 4, 13, 32],
  [10, 37, 21, 8],
  [10, 20, 16, 23],
  [10, 32, 30, 26],
  [15, 16, 12, 16],
  [10, 4, 13, 32],
  [19, 37, 21, 8],
  [15, 20, 16, 23],
  [11, 32, 30, 26],
  [10, 16, 12, 16],
  [6, 4, 13, 3],
  [10, 37, 21, 8],
  [10, 20, 16, 28],
  [10, 32, 30, 26],
  [10, 16, 12, 16],
  [10, 32, 30, 26],
  [15, 16, 12, 16],
  [19, 37, 21, 8],
  [10, 20, 16, 23],
  [16, 32, 30, 26],
  [40, 16, 12, 16],
  [10, 4, 13, 32]
];

const qs = d3qs;

const canvas1 = qs.canvas.createCanvas('#chart');
const bar1 = new qs.bar(canvas1);
bar1.horizontal(vals2);
const line1 = new qs.line(canvas1);
line1.horizontalBanded(vals2, 6);
const points1 = new qs.points(canvas1);
points1
  .horizontalBanded(vals2)
  .points.attr('fill', 'green')
  .attr('r', '5');
const axis1 = new qs.axis(canvas1);
axis1.xAxisBanded([['a'], ['b'], ['c'], ['d'], ['e']]);
axis1.yAxis(vals2);

const canvas2 = qs.canvas.createCanvas('#chart');
const bar2 = new qs.bar(canvas2);
bar2.vertical(vals);
const axis2 = new qs.axis(canvas2);
axis2.yAxisBanded([['a'], ['b'], ['c'], ['d'], ['e']]);
axis2.xAxis(vals);

const canvas3 = qs.canvas.createCanvas('#chart');
const bar3 = new qs.barGroup(canvas3);
bar3.stacked(vals3);
const axis3 = new qs.axis(canvas3);
axis3.yAxisBanded([['a'], ['b'], ['c'], ['d'], ['e']]);
axis3.xAxis(vals);

const canvas4 = qs.canvas.createCanvas('#chart');
const bar4 = new qs.barGroup(canvas4);
bar4.grouped(vals3);
const axis4 = new qs.axis(canvas4);
axis4.yAxisBanded([['a'], ['b'], ['c'], ['d'], ['e']]);
axis4.xAxis(vals);

const canvas5 = qs.canvas.createCanvas('#chart');
const bar5 = new qs.barFloating(canvas5);
bar5.horizontal(vals4);
const axis5 = new qs.axis(canvas5);
axis5.yAxis([0, 70]);
axis5.xAxisBanded([['a'], ['b'], ['c'], ['d'], ['e']]);

const canvas6 = qs.canvas.createCanvas('#chart');
const bar6 = new qs.barFloating(canvas6);
bar6.vertical(vals4);
const axis6 = new qs.axis(canvas6);
axis6.yAxisBanded([['a'], ['b'], ['c'], ['d'], ['e']]);
axis6.xAxis([0, 70]);
