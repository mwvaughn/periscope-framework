var _dec, _class;

import { ListenerBehavior } from './listner-behavior';
import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from 'aurelia-framework';

export let DataFilterHandleBehavior = (_dec = inject(EventAggregator), _dec(_class = class DataFilterHandleBehavior extends ListenerBehavior {
  constructor(eventAggregator) {
    super();
    this._eventAggregator = eventAggregator;
  }

  attachToWidget(widget) {
    super.attachToWidget(widget);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this.channel, message => {
      var filterToApply = me._filterMapper ? me._filterMapper(message.params) : message.params.dataFilter;
      me.widget.dataFilter = filterToApply;
      me.widget.refresh();
    });
  }

  detach() {
    super.detach(dashboard);
    if (this.subscription) this.subscription.dispose();
  }

  persistConfigurationTo(configurationInfo) {
    configurationInfo.addScript("filterMapper", this.filterMapper);
    super.persistConfigurationTo(configurationInfo);
  }
  restoreConfigurationFrom(configurationInfo) {
    this.filterMapper = configurationInfo.getScript("filterMapper");
    super.restoreConfigurationFrom(configurationInfo);
  }
}) || _class);