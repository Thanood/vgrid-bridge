import 'bootstrap';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('skeleton-bridge', plugin => plugin.useAll());
    // .plugin('skeleton-bridge');

  aurelia.use.globalResources('shared/collapse-panel');
  aurelia.use.globalResources('shared/markdown');
  aurelia.use.globalResources('shared/logger');
  aurelia.use.globalResources('shared/au-code');

  aurelia.start()
    .then(au => au.setRoot('app'));
}
