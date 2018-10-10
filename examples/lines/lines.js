var vals1 = [[0], [10], [20], [30], [40], [26], [90], [15], [102], [112], [156], [132]];
var vals2 = [[0], [15], [40], [30], [80], [100], [86], [136], [125], [155], [205], [213]];
var vals3 = [[0], [37], [47], [45], [64], [34], [15], [125], [115], [135], [115], [190]];
var vals4 = [[0], [5], [10], [20], [30], [46], [10], [5], [92], [102], [146], [142]];
var vals5 = [[140], [140]];
var letters = [['a'], ['b'], ['c'], ['d'], ['e'], ['f'], ['g'], ['h'], ['i'], ['j'], ['k'], ['l']];
const max = d3.max([
  d3.max(vals1.map(d => d[0])),
  d3.max(vals2.map(d => d[0])),
  d3.max(vals3.map(d => d[0])),
  d3.max(vals3.map(d => d[0]))
]);

const qs = d3qs;
const canvas1 = qs.canvas.createCanvas('#chart', { width: 800, max: max, min: 0 });
const line1 = new qs.line(canvas1);
const axis1 = new qs.axis(canvas1);
axis1.xAxis(letters);
axis1.yAxis([10, 100]);
line1
  .horizontal(vals2, 6)
  .line.attr('stroke', 'red')
  .attr('stroke-width', 4);
line1
  .horizontal(vals1, 6)
  .line.attr('stroke-linejoin', 'round')
  .attr('stroke-linecap', 'round')
  .attr('stroke-width', 1)
  .style('stroke-dasharray', '20, 20')
  .attr('stroke', 'steelblue');
line1
  .horizontal(vals3)
  .line.attr('stroke-width', 2)
  .attr('stroke', 'green')
  .style('stroke-dasharray', '3, 3');
line1
  .horizontal(vals4, 6)
  .line.attr('stroke-width', 3)
  .attr('stroke', 'orange')
  .style('stroke-dasharray', '5 , 3, 5, 5, 30, 5');
line1.horizontal(vals5).line.attr('stroke-width', 2);

const canvas2 = qs.canvas.createCanvas('#chart', { max: max, min: 0 });
const line2 = new qs.line(canvas2, 0);
line2.vertical(vals1);

const canvas3 = qs.canvas.createCanvas('#chart', { max: max, min: 0 });
const line3 = new qs.line(canvas3, 6);
line3.horizontalBanded(vals1);

const canvas4 = qs.canvas.createCanvas('#chart', { max: max, min: 0 });
const line4 = new qs.line(canvas4, 6);
line4.verticalBanded(vals1);
