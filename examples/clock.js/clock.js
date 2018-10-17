const vals0 = [];
for (var i = 1; i < 61; i++) {
  vals0.push([i]);
}

const vals1 = [];
for (var i = 1; i < 61; i += 5) {
  vals1.push([i]);
}

const numbers = [];
for (var i = 0; i < 12; i++) {
  numbers.push(i === 0 ? [1, 12] : [1, i]);
}

const qs = d3qs;
const canvas1 = qs.canvas.createCanvas('#chart', { width: 500 });
const radialText1 = new qs.radialText(canvas1, { radius: 110, fontSize: 4 });
const text1 = new qs.text(canvas1, { fontSize: 12 });
const radialSpokes1 = new qs.radialSpokes(canvas1, {
  axisAngle: 90,
  radius: 100,
  fontSize: 3,
  gap: 20,
  colour: 'black',
  innerSpokeRadius: 5,
  y: 50
});
radialText1.horizontal(numbers);
text1.text([[-5, -10, 'Clock ']]).text.style('text-anchor', 'start');
radialSpokes1.updateConfig({ innerSpokeRadius: 95 });
const spokes1 = radialSpokes1.spokesMinimised(vals0);
spokes1.spokes.attr('stroke-width', 2);
radialSpokes1.updateConfig({ innerSpokeRadius: 90 });
const spokes2 = radialSpokes1.spokesMinimised(vals1);
spokes2.spokes.attr('stroke-width', 4).attr('stroke', 'blue');

window.setTimeout(function() {
  spokes1.maximise();
  spokes2.maximise();
}, 1000);

// Pure D3
const { config, displayGroup } = canvas1;
const { displayAreaWidth, displayAreaHeight } = config;
const line = coordinates => {
  let line = d3
    .line(coordinates)
    .x(d => d[0])
    .y(d => d[1]);
  let lineGroup = displayGroup.append('g');
  lineGroup
    .append('path')
    .attr('class', 'clockHand')
    .attr('transform-origin', '' + displayAreaWidth / 2 + ' ' + displayAreaHeight / 2 + '')
    .attr('d', line(coordinates));
  return { line: lineGroup.select('path') };
};
const hours = line([[displayAreaWidth / 2, displayAreaHeight / 2], [displayAreaWidth / 2, displayAreaHeight / 8]]);
const mins = line([[displayAreaWidth / 2, displayAreaHeight / 2], [displayAreaWidth / 2, displayAreaHeight / 16]]);
const seconds = line([[displayAreaWidth / 2, displayAreaHeight / 2], [displayAreaWidth / 2, 0]]);
hours.line.attr('stroke', 'black').attr('stroke-width', 10);
mins.line.attr('stroke', 'blue').attr('stroke-width', 5);
seconds.line.attr('stroke', 'red');

const updateData = () => {
  const t = new Date();
  seconds.line.transition().attr('transform', 'rotate(' + (360 / 60) * t.getSeconds() + ')');
  mins.line.transition().attr('transform', 'rotate(' + (360 / 60) * t.getMinutes() + ')');
  hours.line.transition().attr('transform', 'rotate(' + (360 / 12) * t.getHours() + ')');
};

setInterval(function() {
  updateData();
}, 1000);
