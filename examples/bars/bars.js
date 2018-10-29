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
  [6, 4, 13, 3]
];

const qs = d3qs;

const canvas1 = qs.canvas.createCanvas('#chart');
const bar1 = new qs.bar(canvas1);
const bars1 = bar1.horizontalMinimised(vals2);
window.setTimeout(function() {
  bars1.maximise();
}, 1000);

const line1 = new qs.line(canvas1);
const line = line1.horizontalBandedMinimised(vals2);
const points1 = new qs.points(canvas1, { radius: 7 });
const points = points1.horizontalBandedMinimised(vals2);
points.points.attr('fill', 'green');
const axis1 = new qs.axis(canvas1);
axis1.xAxisBanded([['a'], ['b'], ['c'], ['d'], ['e'], ['f'], ['g'], ['h']]);
axis1.yAxis(vals2);

const canvas2 = qs.canvas.createCanvas('#chart');
const bar2 = new qs.bar(canvas2);
const bars2 = bar2.verticalMinimised(vals);
window.setTimeout(function() {
  line.maximise();
  points.maximise();
  bars2.maximise();
}, 1000);

const axis2 = new qs.axis(canvas2);
axis2.yAxisBanded([['a'], ['b'], ['c'], ['d'], ['e']]);
axis2.xAxis(vals);

const canvas3 = qs.canvas.createCanvas('#chart');
const bar3 = new qs.barGroup(canvas3);
const grouped = bar3.grouped(vals3);
const stacked = bar3.stackedMinimised(vals3);

window.setTimeout(function() {
  grouped.minimise();
}, 1000);
window.setTimeout(function() {
  stacked.maximise();
}, 4000);

const axis3 = new qs.axis(canvas3);
axis3.yAxis(vals);
axis3.xAxisBanded([['a'], ['b'], ['c'], ['d'], ['e'], ['f'], ['g'], ['h'], ['i'], ['j'], ['k'], ['l'], ['m'], ['n']]);

// const canvas4 = qs.canvas.createCanvas('#chart');
// const bar4 = new qs.barGroup(canvas4);
// const groups = bar4.groupedMinimised(vals3);
// window.setTimeout(function() {
//   groups.maximise();
// }, 1000);
// const axis4 = new qs.axis(canvas4);
// axis4.yAxis(vals);
// axis4.xAxisBanded([['a'], ['b'], ['c'], ['d'], ['e'], ['f'], ['g'], ['h'], ['i'], ['j'], ['k'], ['l'], ['m'], ['n']]);

const canvas5 = qs.canvas.createCanvas('#chart');
const bar5 = new qs.barFloating(canvas5);
const bars5 = bar5.horizontalMinimised(vals4);
window.setTimeout(function() {
  bars5.maximise();
}, 1000);
const axis5 = new qs.axis(canvas5);
axis5.yAxis([0, 70]);
axis5.xAxisBanded([['a'], ['b'], ['c'], ['d'], ['e']]);

const canvas6 = qs.canvas.createCanvas('#chart');
const bar6 = new qs.barFloating(canvas6);
const bars6 = bar6.verticalMinimised(vals4);
window.setTimeout(function() {
  bars6.maximise();
}, 1000);
const axis6 = new qs.axis(canvas6);
axis6.yAxisBanded([['a'], ['b'], ['c'], ['d'], ['e']]);
axis6.xAxis([0, 70]);
