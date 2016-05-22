import {ConfigBuilder} from './config-builder';

export function configure(aurelia, configCallback?: (builder: ConfigBuilder) => void) {
  let builder = new ConfigBuilder();

  if (configCallback !== undefined && typeof(configCallback) === 'function') {
    configCallback(builder);
  }

  aurelia.globalResources(builder.globalResources);
}
