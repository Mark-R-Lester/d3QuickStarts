import { Core } from '../core/Core.js';
export class RadialText extends Core {
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

  draw(args) {
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
          textId: `text${this.guid()}`,
          textClass: `text`,
          arcId: `arc${this.guid()}`,
          arcClass: `arc`,
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
    const group = this.displayGroup.append('g');
    const arcs = group.append('g');
    const text = group.append('g');

    if (type !== 'follow') {
      text
        .selectAll(`.${meta[0].textClass}`)
        .data(minimised ? meta[0].textArcDataMin : meta[0].textArcData)
        .enter()
        .append('g')
        .attr('transform', `translate(${xAxis(x)}, ${yAxis(y)})`)
        .append('text')
        .attr('class', d => d.textClass)
        .attr('id', d => d.textId)
        .attr('font-size', minimised ? 0 + 'px' : yAxis(fontSize) + 'px')
        .style('text-anchor', 'middle')
        .attr('transform', d => `translate(${arc.centroid(d)}) rotate(${rotate(d)})`)
        .attr('dy', '0.35em')
        .text(d => (d.data[1] ? d.data[1] : d.data[0]));
    } else {
      arcs
        .selectAll(`.${meta[0].arcClass}`)
        .data(minimised ? meta[0].textArcDataMin : meta[0].textArcData)
        .enter()
        .append('path')
        .attr('class', d => d.arcClass)
        .attr('id', d => d.arcId)
        .attr('d', arc)
        .attr('stroke-width', 0)
        .attr('fill', 'none')
        .attr('transform', `translate(${xAxis(x)}, ${yAxis(y)})`);
      text
        .selectAll(`.${meta[0].textClass}`)
        .data(minimised ? meta[0].textArcDataMin : meta[0].textArcData)
        .enter()
        .append('text')
        .attr('font-size', minimised ? `${0}px` : `${yAxis(fontSize)}px`)
        .attr('class', d => d.textClass)
        .attr('id', d => d.textId)
        .append('textPath')
        .attr('startOffset', '25%')
        .style('text-anchor', 'middle')
        .attr('xlink:href', d => `#${d.arcId}`)
        .text(d => (d.data[1] ? d.data[1] : d.data[0]));
    }
    return {
      text: text.selectAll('.arcText'),
      textArcs: arcs.selectAll('.textArc'),
      group,
      meta,
      minimise: () => {
        if (type !== 'follow') {
          text;
          text
            .selectAll('.text')
            .data(meta[0].textArcDataMin)
            .transition()
            .duration(3000)
            .attr('font-size', yAxis(fontSize) + 'px')
            .attr('transform', d => `translate(${arc.centroid(d)}) rotate(${rotate(d)})`);
        } else {
          arcs
            .selectAll('.arc')
            .data(meta[0].textArcDataMin)
            .transition()
            .duration(3000)
            .attr('d', arc);
          text
            .selectAll('.text')
            .data(meta[0].textArcDataMin)
            .transition()
            .duration(3000)
            .attr('font-size', `${yAxis(fontSize)}px`);
        }
      },
      maximise: () => {
        if (type !== 'follow') {
          text
            .selectAll('.text')
            .data(meta[0].textArcData)
            .transition()
            .duration(3000)
            .attr('font-size', yAxis(fontSize) + 'px')
            .attr('transform', d => `translate(${arc.centroid(d)}) rotate(${rotate(d)})`);
        } else {
          arcs
            .selectAll('.arc')
            .data(meta[0].textArcData)
            .transition()
            .duration(3000)
            .attr('d', arc);
          text
            .selectAll('.text')
            .data(meta[0].textArcData)
            .transition()
            .duration(3000)
            .attr('font-size', yAxis(fontSize) + 'px');
        }
      }
    };
  }

  spokeMinimised(data) {
    return this.draw({ data, banded: false, type: 'spoke', minimised: true });
  }

  horizontalMinimised(data) {
    return this.draw({ data, banded: false, type: 'horizontal', minimised: true });
  }

  rotatedMinimised(data) {
    return this.draw({ data, banded: false, type: 'rotated', minimised: true });
  }

  followMinimised(data) {
    return this.draw({ data, banded: false, type: 'follow', minimised: true });
  }

  spokeBandedMinimised(data) {
    return this.draw({ data, banded: true, type: 'spoke', minimised: true });
  }

  horizontalBandedMinimised(data) {
    return this.draw({ data, banded: true, type: 'horizontal', minimised: true });
  }

  rotatedBandedMinimised(data) {
    return this.draw({ data, banded: true, type: 'rotated', minimised: true });
  }

  followBandedMinimised(data) {
    return this.draw({ data, banded: true, type: 'follow', minimised: true });
  }

  spoke(data) {
    return this.draw({ data, banded: false, type: 'spoke', minimised: false });
  }

  horizontal(data) {
    return this.draw({ data, banded: false, type: 'horizontal', minimised: false });
  }

  rotated(data) {
    return this.draw({ data, banded: false, type: 'rotated', minimised: false });
  }

  follow(data) {
    return this.draw({ data, banded: false, type: 'follow', minimised: false });
  }

  spokeBanded(data) {
    return this.draw({ data, banded: true, type: 'spoke', minimised: false });
  }

  horizontalBanded(data) {
    return this.draw({ data, banded: true, type: 'horizontal', minimised: false });
  }

  rotatedBanded(data) {
    return this.draw({ data, banded: true, type: 'rotated', minimised: false });
  }

  followBanded(data) {
    return this.draw({ data, banded: true, type: 'follow', minimised: false });
  }
}
