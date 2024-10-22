function getvals(ind){
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

const legendData = [['blue', 'good'], ['red', 'bad'], ['purple', 'ugly']];
const legendRef = new qs.Legend(canvas1, {
  x: 0,
  y: 0
});
const legend = legendRef.legend(legendData);

const radialLine1 = new qs.RadialLine(canvas1, {
  curve: curves[0],
  x: 50,
  y: 50
});
const radialText1 = new qs.RadialText(canvas1, { radius: 110, fontSize: 4 });
const radialPoints1 = new qs.RadialPoints(canvas1, { radius: 100 });
const radialAxis1 = new qs.RadialAxis(canvas1, {
  axisAngle: 48,
  radius: 100,
  fontSize: 3,
  gap: 20,
  colour: 'steelBlue'
});
const radialSpokes1 = new qs.RadialSpokes(canvas1, {
  colour: 'steelBlue',
  radius: 103
});
const radialArea1 = new qs.RadialArea(canvas1, {
  curve: curves[0],
  x: 50,
  y: 50
});

const colours = ['blue', 'red', 'purple'];
const areas = colours.map((colour, i) => {
  const vals = getvals(i);
  return {
    area: radialArea1.radialAreaMinimised(vals),
    line: radialLine1.radialLineMinimised(vals),
    point: radialPoints1.radialPointsMinimised(vals)
  };
});

areas.forEach((area, i) => {
  area.point.points.attr('opacity', 0.3).attr('fill', colours[i]);
  area.line.line
    .attr('stroke', colours[i])
    .attr('opacity', 0.3)
    .attr('stroke-width', 3);
  area.area.area
    .attr('fill', colours[i])
    .attr('opacity', 0.1)
    .on('click', e => {
      area.area.area.attr('fill', 'blue');
    });
});

const radialText = radialText1.rotatedMinimised(vals2);
//const radialText = radialText1.followMinimised(vals2);

const spokes1 = radialSpokes1.spokesMinimised(vals2);
const rings1 = radialAxis1.ringsMinimised([0, 0, 0, 0, 0, 33]);

window.setTimeout(function() {
  rings1.maximise();
  spokes1.maximise();
}, 1000);

window.setTimeout(function() {
  areas.forEach((area, i) => {
    area.area.maximise();
  });
}, 2000);

window.setTimeout(function() {
  areas.forEach((area, i) => {
    area.line.maximise();
  });
}, 3000);

window.setTimeout(function() {
  areas.forEach((area, i) => {
    area.point.maximise();
  });
}, 4000);

window.setTimeout(function() {
  radialText.maximise();
}, 6000);
