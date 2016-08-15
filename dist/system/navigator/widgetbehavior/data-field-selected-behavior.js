'use strict';

System.register(['./broadcaster-behavior', '../events/widget-event-message', 'aurelia-event-aggregator', 'aurelia-framework'], function (_export, _context) {
  var BroadcasterBehavior, WidgetEventMessage, EventAggregator, inject, _dec, _class, DataFieldSelectedBehavior;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_broadcasterBehavior) {
      BroadcasterBehavior = _broadcasterBehavior.BroadcasterBehavior;
    }, function (_eventsWidgetEventMessage) {
      WidgetEventMessage = _eventsWidgetEventMessage.WidgetEventMessage;
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }],
    execute: function () {
      _export('DataFieldSelectedBehavior', DataFieldSelectedBehavior = (_dec = inject(EventAggregator), _dec(_class = function (_BroadcasterBehavior) {
        _inherits(DataFieldSelectedBehavior, _BroadcasterBehavior);

        function DataFieldSelectedBehavior(eventAggregator) {
          _classCallCheck(this, DataFieldSelectedBehavior);

          var _this = _possibleConstructorReturn(this, _BroadcasterBehavior.call(this));

          _this.eventToAttach = "dataFieldSelected";
          _this._eventAggregator = eventAggregator;
          return _this;
        }

        DataFieldSelectedBehavior.prototype.attachToWidget = function attachToWidget(widget) {

          _BroadcasterBehavior.prototype.attachToWidget.call(this, widget);
          var me = this;

          widget[this.eventToAttach] = function (fieldName) {
            var message = new WidgetEventMessage(me.widget.name);
            message.params = { fieldName: fieldName };
            me._eventAggregator.publish(me.channel, message);
          };
        };

        DataFieldSelectedBehavior.prototype.detach = function detach() {
          _BroadcasterBehavior.prototype.detach.call(this, dashboard);
        };

        DataFieldSelectedBehavior.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {
          _BroadcasterBehavior.prototype.persistConfigurationTo.call(this, configurationInfo);
        };

        DataFieldSelectedBehavior.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
          _BroadcasterBehavior.prototype.restoreConfigurationFrom.call(this, configurationInfo);
        };

        return DataFieldSelectedBehavior;
      }(BroadcasterBehavior)) || _class));

      _export('DataFieldSelectedBehavior', DataFieldSelectedBehavior);
    }
  };
});