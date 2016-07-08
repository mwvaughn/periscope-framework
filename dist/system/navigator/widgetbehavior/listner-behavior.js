'use strict';

System.register(['./widget-behavior', './../behavior-type'], function (_export, _context) {
  var WidgetBehavior, BehaviorType, ListenerBehavior;

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
    setters: [function (_widgetBehavior) {
      WidgetBehavior = _widgetBehavior.WidgetBehavior;
    }, function (_behaviorType) {
      BehaviorType = _behaviorType.BehaviorType;
    }],
    execute: function () {
      _export('ListenerBehavior', ListenerBehavior = function (_WidgetBehavior) {
        _inherits(ListenerBehavior, _WidgetBehavior);

        function ListenerBehavior() {
          _classCallCheck(this, ListenerBehavior);

          var _this = _possibleConstructorReturn(this, _WidgetBehavior.call(this));

          _this.type = BehaviorType.listener;
          return _this;
        }

        return ListenerBehavior;
      }(WidgetBehavior));

      _export('ListenerBehavior', ListenerBehavior);
    }
  };
});