import { Core } from '../core/core.js';
export class Template {
  constructor(canvas, config) {
    super(canvas);
    this.defaultConfig = {};
    this.resetConfig();
    this.updateConfig(config);
  }

  draw(args) {
    const meta = [];
    const { data, minimise } = args;
    const { min, max, displayAreaWidth, displayAreaHeight } = this.config;
    const {} = this.localConfig;

    const groupName = this.displayGroup.append('g');
    groupName
      .selectAll('.element')
      .data(data)
      .enter()
      .append('g');

    return {
      groupName,
      meta,
      minimise: () => {},
      maximise: () => {}
    };
  }

  functionName(data) {
    draw({ data, minimise: false });
  }
}
