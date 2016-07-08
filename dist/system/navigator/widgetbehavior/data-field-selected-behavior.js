'use strict';

System.register(['./broadcaster-behavior', '../events/widget-event-message'], function (_export, _context) {
  var BroadcasterBehavior, WidgetEventMessage, DataFieldSelectedBehavior;

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
    }],
    execute: function () {
      _export('DataFieldSelectedBehavior', DataFieldSelectedBehavior = function (_BroadcasterBehavior) {
        _inherits(DataFieldSelectedBehavior, _BroadcasterBehavior);

        function DataFieldSelectedBehavior(channel, eventAggregator) {
          _classCallCheck(this, DataFieldSelectedBehavior);

          var _this = _possibleConstructorReturn(this, _BroadcasterBehavior.call(this));

          _this.channel = channel;
          _this.eventToAttach = "dataSelected";

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

        return DataFieldSelectedBehavior;
      }(BroadcasterBehavior));

      _export('DataFieldSelectedBehavior', DataFieldSelectedBehavior);
    }
  };
});