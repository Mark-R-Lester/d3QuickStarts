var vals0 = [
  [15],
  [15],
  [15],
  [17],
  [16],
  [21],
  [14],
  [15],
  [16],
  [12],
  [15],
  [15],
  [15],
  [17],
  [16],
  [15],
  [15],
  [15],
  [17],
  [16],
  [21],
  [14],
  [15],
  [16],
  [12],
  [15]
];

var vals1 = [
  [16],
  [17],
  [18],
  [20],
  [17],
  [23],
  [23],
  [20],
  [17],
  [16],
  [16],
  [17],
  [18],
  [20],
  [17],
  [16],
  [17],
  [18],
  [20],
  [17],
  [23],
  [23],
  [20],
  [17],
  [16],
  [16]
];

var vals2 = [
  [20],
  [21],
  [19],
  [22],
  [21],
  [24],
  [24],
  [22],
  [19],
  [18],
  [17],
  [19],
  [20],
  [25],
  [19],
  [20],
  [21],
  [19],
  [22],
  [21],
  [24],
  [24],
  [22],
  [19],
  [18],
  [17]
];

var vals3 = [[1, 20], [1, 20], [1, 20], [1, 20], [1, 20], [1, 20], [1, 20]];

const data1 = [
  [1, 'a'],
  [1, 'b'],
  [1, 'c'],
  [1, 'd'],
  [1, 'e'],
  [1, 'f'],
  [1, 'g'],
  [1, 'h'],
  [1, 'i'],
  [1, 'j'],
  [1, 'k'],
  [1, 'l'],
  [1, 'm'],
  [1, 'n'],
  [1, 'o'],
  [1, 'p'],
  [1, 'q'],
  [1, 'r'],
  [1, 's'],
  [1, 't'],
  [1, 'u'],
  [1, 'v'],
  [1, 'w'],
  [1, 'x'],
  [1, 'y'],
  [1, 'z']
];

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
const canvas1 = qs.canvas.createCanvas('#chart', { width: 800 });
const radialArea1 = new qs.radialArea(canvas1, {
  curve: curves[0],
  x: 50,
  y: 50,
  max: 25
});

const radialText1 = new qs.radialText(canvas1, { radius: 110, fontSize: 4 });
const text1 = new qs.text(canvas1, { fontSize: 12 });
const radialAxis1 = new qs.radialAxis(canvas1, {
  axisAngle: 90,
  radius: 100,
  fontSize: 3,
  gap: 20,
  colour: 'steelBlue',
  innerSpokeRadius: 5
});

radialArea1
  .radialArea(vals0)
  .area.attr('fill', 'yellow')
  .attr('opacity', 0.5);
radialArea1.radialArea(vals1, vals0).area.attr('opacity', 0.5);
radialArea1
  .radialArea(vals2, vals1)
  .area.attr('fill', 'blue')
  .attr('opacity', 0.5);
radialAxis1.rings([[0], [0], [0], [0], [10]]); //.text.attr('fill', 'red');
radialAxis1.updateConfig({ radius: 103 });
radialAxis1.spokes(data1);
radialText1.horizontal(data1);
text1.text([[-5, -10, 'Radial Area ']]).text.style('text-anchor', 'start');
