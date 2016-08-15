import { customElement, inject, useView } from 'aurelia-framework';
import { Widget } from './widget';

export let DetailedView = class DetailedView extends Widget {
  constructor() {
    super();
    this.stateType = "detailedViewState";
  }

  persistConfigurationTo(configurationInfo) {
    configurationInfo.addValue("fields", this.fields);
    super.persistConfigurationTo(configurationInfo);
  }
  restoreConfigurationFrom(configurationInfo) {
    this.fields = configurationInfo.getValue("fields");
    super.restoreConfigurationFrom(configurationInfo);
  }
};