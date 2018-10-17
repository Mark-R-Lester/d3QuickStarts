function getvals(ind) {
  const vals = [];
  for (let i = 0; i < 26; i++) {
    let num = ((Math.random() * 10) / 10) * (10 * (ind + 1));
    num = num < 5 ? 15 : num;
    vals.push([num]);
  }
  return vals;
}

var vals2 = [
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
  d3.curveCatmullRomClosed
];

const qs = d3qs;
const canvas1 = qs.canvas.createCanvas('#chart', { width: 800, max: 30, min: 0 });
const radialLine1 = new qs.radialLine(canvas1, {
  curve: curves[0],
  x: 50,
  y: 50
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
const radialSpokes1 = new qs.radialSpokes(canvas1, {
  colour: 'steelBlue',
  radius: 103
});
const radialArea1 = new qs.radialArea(canvas1, {
  curve: curves[0],
  x: 50,
  y: 50
});

const colours = ['blue', 'red', 'purple'];
colours.forEach((colour, i) => {
  const vals = getvals(i);
  const area1 = radialArea1.radialArea(vals);
  area1.area
    .attr('fill', colours[i])
    .attr('opacity', 0.1)
    .on('click', e => {
      area1.area.attr('fill', 'blue');
    });
  radialLine1
    .radialLine(vals)
    .line.attr('stroke', colours[i])
    .attr('opacity', 0.3)
    .attr('stroke-width', 3);
  radialPoints1
    .radialPoints(vals)
    .points.attr('r', 5)
    .attr('opacity', 0.3)
    .attr('fill', colours[i]);
});

radialText1.horizontal(vals2);

const spokes1 = radialSpokes1.spokesMinimised(vals2); //.text.attr('fill', 'red');
const rings1 = radialAxis1.ringsMinimised([[0], [0], [0], [0], [0], [33]]); //.text.attr('fill', 'red');

window.setTimeout(function() {
  rings1.maximise();
  spokes1.maximise();
}, 1000);
