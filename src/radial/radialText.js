export class radialText {
  constructor(canvas, config) {
    this.config = canvas.config;
    this.displayGroup = canvas.displayGroup;
    this.defaultConfig = {
      radius: 100,
      fontSize: 8,
      x: 50,
      y: 50
    };
    this.localConfig = {};
    this.resetConfig();
    this.updateConfig(config);
  }

  resetConfig() {
    Object.keys(this.defaultConfig).forEach(key => (this.localConfig[key] = this.defaultConfig[key]));
  }

  updateConfig(config) {
    config = config ? config : {};
    Object.keys(config).forEach(key => (this.localConfig[key] = config[key]));
  }

  radial(data, banded, type) {
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
      .range([0, this.config.displayAreaWidth]);
    const yAxis = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, this.config.displayAreaHeight]);
    //const bandData = d3.pie().value(d => d[0]);

    const bandData = data => {
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
          endAngle
        };
        startAngle = endAngle;
        return res;
      });
    };

    const pointData = data =>
      bandData(data).map(d => {
        const offSet = (d.endAngle - d.startAngle) / 2;
        d.startAngle = d.startAngle - offSet;
        d.endAngle = d.endAngle - offSet;
        return d;
      });

    const label = d3
      .arc()
      .outerRadius(yAxis(this.localConfig.radius / 2))
      .innerRadius(yAxis(this.localConfig.radius / 2));
    const arcs = this.displayGroup.append('g');
    const arc = arcs
      .selectAll('.arc')
      .data(banded ? bandData(data) : pointData(data))
      .enter()
      .append('g')
      .attr('class', 'arc')
      .attr('transform', 'translate(' + xAxis(this.localConfig.x) + ',' + yAxis(this.localConfig.y) + ')');
    arc
      .append('text')
      .attr('font-size', yAxis(this.localConfig.fontSize) + 'px')
      .style('text-anchor', 'middle')
      .attr('transform', d => 'translate(' + label.centroid(d) + ')rotate(' + rotate(d) + ')')
      .attr('dy', '0.35em')
      .text(d => {
        return d.data[1] ? d.data[1] : d.data[0];
      });
    return { text: arc.selectAll('text') };
  }

  spoke(data) {
    return this.radial(data, false, 'spoke');
  }

  horizontal(data) {
    return this.radial(data, false, 'horizontal');
  }

  rotated(data) {
    return this.radial(data, false, 'rotated');
  }

  spokeBanded(data) {
    return this.radial(data, true, 'spoke');
  }

  horizontalBanded(data) {
    return this.radial(data, true, 'horizontal');
  }

  rotatedBanded(data) {
    return this.radial(data, true, 'rotated');
  }

  follow(data, banded) {
    const xAxis = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, this.config.displayAreaWidth]);
    const yAxis = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, this.config.displayAreaHeight]);
    const bandData = data => {
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
          endAngle
        };
        startAngle = endAngle;
        return res;
      });
    };

    const pointData = data =>
      bandData(data).map(d => {
        const offSet = (d.endAngle - d.startAngle) / 2;
        d.startAngle = d.startAngle - offSet;
        d.endAngle = d.endAngle - offSet;
        return d;
      });

    const distinct = Math.random().toString();
    const arc = d3
      .arc()
      .cornerRadius(0)
      .padRadius(0)
      .outerRadius(yAxis(this.localConfig.radius / 2))
      .innerRadius(yAxis(this.localConfig.radius / 2));
    const arcs = this.displayGroup.append('g');
    arcs
      .selectAll('.textArc')
      .data(banded ? bandData(data) : pointData(data))
      .enter()
      .append('path')
      .attr('class', 'textArc')
      .attr('id', (d, i) => 'textArc_' + distinct + i)
      .attr('d', arc)
      .attr('transform', 'translate(' + xAxis(this.localConfig.x) + ',' + yAxis(this.localConfig.y) + ')');
    const text = this.displayGroup.append('g');
    text
      .selectAll('.arcText')
      .data(data)
      .enter()
      .append('text')
      .attr('font-size', yAxis(this.localConfig.fontSize) + 'px')
      .attr('class', 'arcText')
      .append('textPath')
      .attr('startOffset', '25%')
      .style('text-anchor', 'middle')
      .attr('xlink:href', (d, i) => '#textArc_' + distinct + i)
      .text(d => (d[1] ? d[1] : d[0]));
    return { text: text.selectAll('.arcText') };
  }

  followPoint(data) {
    return this.follow(data, false);
  }

  followBanded(data) {
    return this.follow(data, true);
  }
}
