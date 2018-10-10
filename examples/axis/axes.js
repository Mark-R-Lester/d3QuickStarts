const data1 = [0, 20, 20, 30, 20, 35, 0, 20, 15, 30, 10, 50];
const data2 = [0, 25, 25, 35, 25, 35, 5, 25, 15, 35, 15, 55];

const qs = d3qs;

const canvas1 = qs.canvas.createCanvas('#chart', { width: 500 });
const axis1 = new qs.axis(canvas1);
axis1.xAxisBottomBanded(data1);
axis1.yAxisLeftBanded(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k']);

axis1.xAxisTopBanded(data1);
axis1.yAxisRightBanded(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k']);

const canvas2 = qs.canvas.createCanvas('#chart');
const axis2 = new qs.axis(canvas2);
axis2.updateConfig({
  tickSize: 6,
  tickSizeInner: 6,
  tickSizeOuter: 0,
  tickPadding: 3,
  fontSize: 5,
  font: 'sans-serif',
  textAngle: 0,
  //textAnchor: 'start',
  //x: 0,
  //y: 0,
  hideAxisDomain: true
});

axis2.yAxisLeft(data2);
axis2.xAxisTop(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k']);
axis2.resetConfig();
axis2.yAxisRight(data2);
axis2.xAxisBottom(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k']);
