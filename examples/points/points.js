var vals1 = [[115], [120], [120], [130], [120], [135], [110], [120], [115], [130], [110], [150]];
var vals2 = [[145], [125], [125], [135], [125], [135], [110], [125], [115], [135], [115], [190]];
var vals3 = [[135], [115], [115], [105], [105], [95], [80], [105], [95], [75], [95], [130]];
var letters = [['a'], ['b'], ['c'], ['d'], ['e'], ['f'], ['g'], ['h'], ['i'], ['j'], ['k'], ['l']];

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

const max = d3.max([d3.max(vals1), d3.max(vals2)]);

const qs = d3qs;

const canvas1 = qs.canvas.createCanvas('#chart', { max: 250, min: 0 });
const point1 = new qs.points(canvas1);
const line1 = new qs.line(canvas1);
const axis1 = new qs.axis(canvas1);
const bar1 = new qs.bar(canvas1);
bar1.horizontal(vals1);
axis1.xAxis(letters);
axis1.yAxis([10, 100]);
point1.horizontal(vals1);
line1.horizontal([230, 230]);
line1.horizontal(vals1);
point1
  .horizontal(vals2)
  .points.attr('stroke', 'red')
  .attr('fill', 'red');
line1.horizontal(vals2, 6).line.attr('stroke', 'red');

const canvas2 = qs.canvas.createCanvas('#chart', { max: 190, min: 50 });
const point2 = new qs.points(canvas2);
const line2 = new qs.line(canvas2, { curve: d3.curveCardinal });
const axis2 = new qs.axis(canvas2);
const bar2 = new qs.bar(canvas2, { padding: 80, colors: ['red'] });
const bar21 = new qs.bar(canvas2, { padding: 5, colors: ['blue'] });
bar21.horizontal(vals2);
bar2.horizontal(vals3);
axis2.xAxisBanded(letters);
axis2.yAxis([0, 100]);
point2.horizontalBanded(vals1);
point2.horizontalBanded(vals2).points.attr('fill', 'red');
line2.horizontalBanded(vals1);
line2
  .horizontalBanded(vals2, 7)
  .line.attr('stroke', 'red')
  .attr('fill', 'red');

const canvas3 = qs.canvas.createCanvas('#chart', { max: 190, min: 100 });
const point3 = new qs.points(canvas3);
const line3 = new qs.line(canvas3, { curve: d3.curveCardinal });
const axis3 = new qs.axis(canvas3);
const bar3 = new qs.bar(canvas3);
bar3.vertical(vals1);
axis3.yAxis(letters);
axis3.xAxis([0, 100]);
point3.vertical(vals1);
point3.vertical(vals2).points.attr('fill', 'red');
line3.vertical(vals1);
line3
  .vertical(vals2, 7)
  .line.attr('stroke', 'red')
  .attr('fill', 'red');

const canvas4 = qs.canvas.createCanvas('#chart', { max: 190, min: 0 });
const point4 = new qs.points(canvas4);
const line4 = new qs.line(canvas4);
const axis4 = new qs.axis(canvas4);
const bar4 = new qs.bar(canvas4);
bar4.vertical(vals1);
axis4.yAxisBanded(letters);
axis4.xAxis([0, 100]);
point4.verticalBanded(vals1);
point4.verticalBanded(vals2).points.attr('fill', 'red');
line4.verticalBanded(vals1);
line4
  .verticalBanded(vals2, 7)
  .line.attr('stroke', 'red')
  .attr('fill', 'red');
