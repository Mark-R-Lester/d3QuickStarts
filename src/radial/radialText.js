import { Core } from '../core/core.js';
export class radialText extends Core {
  constructor(canvas, config) {
    super(canvas);
    this.defaultConfig = {
      radius: 100,
      fontSize: 8,
      x: 50,
      y: 50
    };
    this.resetConfig();
    this.updateConfig(config);
  }

  radial(args) {
    const { data, banded, type, minimised } = args;
    const { radius, fontSize, x, y } = this.localConfig;
    const { displayAreaHeight, displayAreaWidth } = this.config;
    const meta = [];
    let rotate;
    if (type === 'spoke') {
      rotate = d => {
        let angle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        angle = angle * (180 / Math.PI);
        return angle - 90;
      };
    }

    if (type === 'horizontal') {
      rotate = d => {
        return 0;
      };
    }

    if (type === 'rotated') {
      rotate = d => {
        let angle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return (angle = angle * (180 / Math.PI));
      };
    }

    const xAxis = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, displayAreaWidth]);
    const yAxis = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, displayAreaHeight]);

    const bandData = (data, min) => {
      let shares = 0;
      data.forEach(d => {
        shares = shares + d[0];
      });
      const angle = (Math.PI * 2) / shares;
      let startAngle = 0;
      return data.map((d, i) => {
        const data = d;
        const index = i;
        const value = d[1] ? d[1] : d[0];
        const endAngle = startAngle + angle * d[0];
        const res = {
          data,
          index,
          value,
          startAngle,
          endAngle,
          outerRadius: min ? 0 : yAxis(radius / 2),
          innerRadius: min ? 0 : yAxis(radius / 2)
        };
        startAngle = endAngle;
        return res;
      });
    };

    const pointData = (data, min) =>
      bandData(data, min).map(d => {
        const offSet = (d.endAngle - d.startAngle) / 2;
        d.startAngle = d.startAngle - offSet;
        d.endAngle = d.endAngle - offSet;
        return d;
      });

    meta.push({
      textArcData: banded ? bandData(data) : pointData(data),
      textArcDataMin: banded ? bandData(data, minimised) : pointData(data, minimised)
    });

    const arc = d3.arc();
    const distinct = Math.random().toString();
    const arcs = this.displayGroup.append('g');
    const text = this.displayGroup.append('g');

    if (type !== 'follow') {
      text
        .selectAll('.arcText')
        .data(minimised ? meta[0].textArcDataMin : meta[0].textArcData)
        .enter()
        .append('g')
        .attr('transform', 'translate(' + xAxis(x) + ',' + yAxis(y) + ')')
        .append('text')
        .attr('class', 'arcText')
        .attr('font-size', minimised ? 0 + 'px' : yAxis(fontSize) + 'px')
        .style('text-anchor', 'middle')
        .attr('transform', d => 'translate(' + arc.centroid(d) + ')rotate(' + rotate(d) + ')')
        .attr('dy', '0.35em')
        .text(d => (d.data[1] ? d.data[1] : d.data[0]));
    } else {
      arcs
        .selectAll('.textArc')
        .data(minimised ? meta[0].textArcDataMin : meta[0].textArcData)
        .enter()
        .append('path')
        .attr('class', 'textArc')
        .attr('id', (d, i) => 'textArc_' + distinct + i)
        .attr('d', arc)
        .attr('stroke-width', 0)
        .attr('fill', 'none')
        .attr('transform', 'translate(' + xAxis(x) + ',' + yAxis(y) + ')');
      text
        .selectAll('.arcText')
        .data(minimised ? meta[0].textArcDataMin : meta[0].textArcData)
        .enter()
        .append('text')
        .attr('font-size', minimised ? 0 + 'px' : yAxis(fontSize) + 'px')
        .attr('class', 'arcText')
        .append('textPath')
        .attr('startOffset', '25%')
        .style('text-anchor', 'middle')
        .attr('xlink:href', (d, i) => '#textArc_' + distinct + i)
        .text(d => (d.data[1] ? d.data[1] : d.data[0]));
    }
    return {
      text: text.selectAll('.arcText'),
      meta,
      minimise: () => {
        if (type !== 'follow') {
          text;
          text
            .selectAll('.arcText')
            .data(meta[0].textArcDataMin)
            .transition()
            .duration(3000)
            .attr('font-size', yAxis(fontSize) + 'px')
            .attr('transform', d => 'translate(' + arc.centroid(d) + ')rotate(' + rotate(d) + ')');
        } else {
          arcs
            .selectAll('.textArc')
            .data(meta[0].textArcDataMin)
            .transition()
            .duration(3000)
            .attr('d', arc);
          text
            .selectAll('.arcText')
            .data(meta[0].textArcDataMin)
            .transition()
            .duration(3000)
            .attr('font-size', yAxis(fontSize) + 'px');
        }
      },
      maximise: () => {
        if (type !== 'follow') {
          text
            .selectAll('.arcText')
            .data(meta[0].textArcData)
            .transition()
            .duration(3000)
            .attr('font-size', yAxis(fontSize) + 'px')
            .attr('transform', d => 'translate(' + arc.centroid(d) + ')rotate(' + rotate(d) + ')');
        } else {
          arcs
            .selectAll('.textArc')
            .data(meta[0].textArcData)
            .transition()
            .duration(3000)
            .attr('d', arc);
          text
            .selectAll('.arcText')
            .data(meta[0].textArcData)
            .transition()
            .duration(3000)
            .attr('font-size', yAxis(fontSize) + 'px');
        }
      }
    };
  }

  spokeMinimised(data) {
    return this.radial({ data, banded: false, type: 'spoke', minimised: true });
  }

  horizontalMinimised(data) {
    return this.radial({ data, banded: false, type: 'horizontal', minimised: true });
  }

  rotatedMinimised(data) {
    return this.radial({ data, banded: false, type: 'rotated', minimised: true });
  }

  followMinimised(data) {
    return this.radial({ data, banded: false, type: 'follow', minimised: true });
  }

  spokeBandedMinimised(data) {
    return this.radial({ data, banded: true, type: 'spoke', minimised: true });
  }

  horizontalBandedMinimised(data) {
    return this.radial({ data, banded: true, type: 'horizontal', minimised: true });
  }

  rotatedBandedMinimised(data) {
    return this.radial({ data, banded: true, type: 'rotated', minimised: true });
  }

  followBandedMinimised(data) {
    return this.radial({ data, banded: true, type: 'follow', minimised: true });
  }

  spoke(data) {
    return this.radial({ data, banded: false, type: 'spoke', minimised: false });
  }

  horizontal(data) {
    return this.radial({ data, banded: false, type: 'horizontal', minimised: false });
  }

  rotated(data) {
    return this.radial({ data, banded: false, type: 'rotated', minimised: false });
  }

  follow(data) {
    return this.radial({ data, banded: false, type: 'follow', minimised: false });
  }

  spokeBanded(data) {
    return this.radial({ data, banded: true, type: 'spoke', minimised: false });
  }

  horizontalBanded(data) {
    return this.radial({ data, banded: true, type: 'horizontal', minimised: false });
  }

  rotatedBanded(data) {
    return this.radial({ data, banded: true, type: 'rotated', minimised: false });
  }

  followBanded(data) {
    return this.radial({ data, banded: true, type: 'follow', minimised: false });
  }
}
