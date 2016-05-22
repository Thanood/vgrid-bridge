/**
* Plugin configuration builder
*/
export class ConfigBuilder {

  globalResources = [];

  useAll() : ConfigBuilder {
    this.globalResources = this.globalResources.concat([
      './vGrid/v-grid-atts',
      './vGrid/v-grid-contextmenu',
      './vGrid/v-grid-row-repeat',
      './vGrid/v-grid-header-cells-label',
      './vGrid/v-grid-header-cells-filter-text',
      './vGrid/v-grid-header-cells-filter-selection',
      './vGrid/v-grid-header-cells-filter-checkbox',
      './vGrid/v-grid-row-cells-image',
      './vGrid/v-grid-row-cells-checkbox',
      './vGrid/v-grid-row-cells-selection',
      './vGrid/v-grid-row-cells-input',
      './vGrid/v-grid-col',
      './vGrid/v-grid-header-col',
      './vGrid/v-grid-row-col',
      './vGrid/v-grid'
    ]);
    return this;
  }
}
