var _dec, _class;

import { BroadcasterBehavior } from './broadcaster-behavior';
import { WidgetEventMessage } from '../events/widget-event-message';
import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from 'aurelia-framework';

export let DataActivatedBehavior = (_dec = inject(EventAggregator), _dec(_class = class DataActivatedBehavior extends BroadcasterBehavior {
  constructor(eventAggregator) {
    super();
    this.eventToAttach = "dataActivated";

    this._eventAggregator = eventAggregator;
  }

  attachToWidget(widget) {
    super.attachToWidget(widget);
    var me = this;

    widget[this.eventToAttach] = function (currentRecord) {
      var message = new WidgetEventMessage(me.widget.name);
      message.params = { activatedData: currentRecord };
      me._eventAggregator.publish(me.channel, message);
    };
  }

  detach() {
    super.detach(dashboard);
  }

  persistConfigurationTo(configurationInfo) {
    super.persistConfigurationTo(configurationInfo);
  }
  restoreConfigurationFrom(configurationInfo) {
    super.restoreConfigurationFrom(configurationInfo);
  }
}) || _class);