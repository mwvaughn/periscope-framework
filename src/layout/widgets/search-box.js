import {customElement, useView} from 'aurelia-framework';
import {Widget} from './widget';
import {WidgetEvent} from './../../navigator/events/widget-event';

export class SearchBox extends Widget {
  constructor() {
    super();
    this.stateType = "searchBoxState";
  }

  _dataFilterChanged = new WidgetEvent();

  searchString;

  get dataFilterChanged() {
    return this._dataFilterChanged;
  }
  set dataFilterChanged(handler) {
    this._dataFilterChanged.attach(handler);
  }


  saveState(){
    this.setState(this.searchString);
  }

  restoreState(){
    let s = this.getState();
    if (s)
      this.searchString = s;
    else
      this.searchString = "";
  }

  persistConfigurationTo(configurationInfo){
    configurationInfo.addValue("searchString", this.searchString);
    super.persistConfigurationTo(configurationInfo);
  }
  restoreConfigurationFrom(configurationInfo){
    this.searchString = configurationInfo.getValue("searchString");
    super.restoreConfigurationFrom(configurationInfo);
  };
}
