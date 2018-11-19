import { Core } from '../core/core.js';
export class Template extends Core {
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

    const group = this.displayGroup.append('g');
    group
      .selectAll('.element')
      .data(data)
      .enter()
      .append('.element');

    return {
      element: group.selectAll('.element'),
      group,
      meta,
      minimise: () => {},
      maximise: () => {}
    };
  }

  functionName(data) {
    draw({ data, minimise: false });
  }

  functionNameMinimised(data) {
    draw({ data, minimise: true });
  }
}
