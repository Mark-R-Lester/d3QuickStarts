export class className {
  constructor(canvas, config) {
    this.config = canvas.config;
    this.displayGroup = canvas.displayGroup;
    this.defaultConfig = {
      //config values
    };
    this.localConfig = {};
    this.resetConfig();
    this.updateConfig(config);
    this.colors = d3
      .scaleOrdinal()
      .domain(this.localConfig.colorDomain)
      .range(this.localConfig.colorRange);
  }

  resetConfig() {
    Object.keys(this.defaultConfig).forEach(key => (this.localConfig[key] = this.defaultConfig[key]));
  }

  updateConfig(config) {
    config = config ? config : {};
    Object.keys(config).forEach(key => (this.localConfig[key] = config[key]));
  }

  functionName(data, minimise) {
    const meta = {};
    const { outerRadius, innerRadius, padAngle, cornerRadius, x, y, min, max } = this.localConfig;

    const groupName = this.displayGroup.append('g');
    groupName
      .selectAll('.element')
      .data(data)
      .enter()
      .append('g');

    return {
      meta,
      minimise: () => {},
      maximise: () => {}
    };
  }
}
