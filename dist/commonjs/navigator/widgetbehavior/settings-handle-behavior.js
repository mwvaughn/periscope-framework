'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingsHandleBehavior = undefined;

var _widgetBehavior = require('./widget-behavior');

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SettingsHandleBehavior = exports.SettingsHandleBehavior = function (_WidgetBehavior) {
  _inherits(SettingsHandleBehavior, _WidgetBehavior);

  function SettingsHandleBehavior(channel, eventAggregator, messageMapper) {
    _classCallCheck(this, SettingsHandleBehavior);

    var _this = _possibleConstructorReturn(this, _WidgetBehavior.call(this));

    _this._channel = channel;
    _this._eventAggregator = eventAggregator;
    _this._messageMapper = messageMapper;
    return _this;
  }

  SettingsHandleBehavior.prototype.attachToWidget = function attachToWidget(widget) {
    _WidgetBehavior.prototype.attachToWidget.call(this, widget);
    var me = this;
    this.subscription = this._eventAggregator.subscribe(this._channel, function (message) {
      var settingsToApply = me._messageMapper ? me._messageMapper(message) : message;
      _.forOwn(settingsToApply, function (v, k) {
        me.widget[k] = v;
      });

      me.widget.refresh();
    });
  };

  SettingsHandleBehavior.prototype.detach = function detach() {
    _WidgetBehavior.prototype.detach.call(this, dashboard);
    if (this.subscription) this.subscription.dispose();
  };

  return SettingsHandleBehavior;
}(_widgetBehavior.WidgetBehavior);