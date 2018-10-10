var vals1 = [
  [33],
  [25],
  [25],
  [30],
  [27],
  [32],
  [33],
  [25],
  [25],
  [30],
  [33],
  [25],
  [25],
  [30],
  [27],
  [32],
  [33],
  [25],
  [25],
  [30],
  [33],
  [25],
  [25],
  [30],
  [27],
  [32],
  [33],
  [25],
  [25],
  [30]
];

var vals2 = [
  [1, 33],
  [1, 25],
  [1, 25],
  [1, 30],
  [1, 27],
  [1, 32],
  [1, 33],
  [1, 25],
  [1, 25],
  [1, 30],
  [1, 33],
  [1, 25],
  [1, 25],
  [1, 30],
  [1, 27],
  [1, 32],
  [1, 33],
  [1, 25],
  [1, 25],
  [1, 30],
  [1, 33],
  [1, 25],
  [1, 25],
  [1, 30],
  [1, 27],
  [1, 32],
  [1, 33],
  [1, 25],
  [1, 25],
  [1, 30]
];

this.curves = [
  d3.curveLinear,
  d3.curveStep,
  d3.curveStepBefore,
  d3.curveStepAfter,
  d3.curveBasis,
  d3.curveCardinal,
  d3.curveMonotoneX,
  d3.curveCatmullRomClosed
];

const qs = d3qs;
const canvas1 = qs.canvas.createCanvas('#chart', { width: 800 });
const radialLine1 = new qs.radialLine(canvas1, {
  curve: curves[0],
  x: 50,
  y: 50,
  max: 33
});
const radialText1 = new qs.radialText(canvas1, { radius: 110, fontSize: 4 });
const radialPoints1 = new qs.radialPoints(canvas1, { radius: 100 });
const radialAxis1 = new qs.radialAxis(canvas1, {
  axisAngle: 45,
  radius: 100,
  fontSize: 3,
  gap: 20,
  colour: 'steelBlue'
});
const radialArea1 = new qs.radialArea(canvas1, {
  curve: curves[0],
  x: 50,
  y: 50,
  max: 33
});

radialArea1
  .radialArea(vals1)
  .area.attr('fill', 'red')
  .attr('opacity', 0.3);

radialLine1
  .radialLine(vals1)
  .line.attr('stroke', 'red')
  .attr('stroke-width', 3);
radialPoints1
  .radialPoints(vals1)
  .points.attr('r', 5)
  .attr('fill', 'red');
radialText1.horizontal(vals2);

radialAxis1.rings([[0], [0], [0], [0], [33]]); //.text.attr('fill', 'red');
radialAxis1.updateConfig({ radius: 105 });
radialAxis1.spokes(vals2); //.text.attr('fill', 'red');
