'use strict';

System.register(['lodash', './../../serialization/configurable'], function (_export, _context) {
  var _, Configurable, _createClass, Widget;

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
    setters: [function (_lodash) {
      _ = _lodash;
    }, function (_serializationConfigurable) {
      Configurable = _serializationConfigurable.Configurable;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('Widget', Widget = function (_Configurable) {
        _inherits(Widget, _Configurable);

        function Widget(settings) {
          _classCallCheck(this, Widget);

          var _this = _possibleConstructorReturn(this, _Configurable.call(this));

          _this.behavior = [];

          _.forOwn(settings, function (v, k) {
            if (k == "behavior") {
              _this._unattachedBehaviors = v;
            } else _this[k] = v;
          });
          return _this;
        }

        Widget.prototype.getStateKey = function getStateKey() {
          if (this.stateStorage) return this.stateStorage.createKey(this.dashboard.name, this.name);
          return "";
        };

        Widget.prototype.getState = function getState() {
          if (this.stateStorage) {
            var s = this.stateStorage.get(this.getStateKey());
            if (s) return s;
          }
          return undefined;
        };

        Widget.prototype.setState = function setState(value) {
          if (this.stateStorage) {
            if (!value) this.stateStorage.remove(this.getStateKey());else this.stateStorage.set(this.getStateKey(), value);
          }
        };

        Widget.prototype.attachBehavior = function attachBehavior(b) {
          b.attachToWidget(this);
        };

        Widget.prototype.attachBehaviors = function attachBehaviors() {
          if (this._unattachedBehaviors) {
            for (var _iterator = this._unattachedBehaviors, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
              var _ref;

              if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
              } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
              }

              var b = _ref;

              this.attachBehavior(b);
            }
          }
        };

        Widget.prototype.changeSettings = function changeSettings(newSettings) {
          var _this2 = this;

          if (newSettings) {
            _.forOwn(newSettings, function (v, k) {
              _this2[k] = v;
            });
            this.refresh();
          }
        };

        Widget.prototype.refresh = function refresh() {};

        Widget.prototype.dispose = function dispose() {
          while (true) {
            if (this.behavior.length > 0) this.behavior[0].detach();else break;
          }
        };

        Widget.prototype.persistConfigurationTo = function persistConfigurationTo(configurationInfo) {

          configurationInfo.addValue("name", this.name);
          configurationInfo.addValue("resourceGroup", this.resourceGroup);
          configurationInfo.addValue("header", this.header);
          configurationInfo.addValue("minHeight", this.minHeight);
          configurationInfo.addValue("stateType", this.stateType);
          configurationInfo.addValue("showHeader", this.showHeader);
          configurationInfo.addValue("dataHolder", this.dataHolder);
          configurationInfo.addValue("dataSource", this.dataSource);
          configurationInfo.addValue("dataFilter", this.dataFilter);
          configurationInfo.addScript("dataMapper", this.dataMapper);

          configurationInfo.addValue("stateStorage", this.stateStorage);
        };

        Widget.prototype.restoreConfigurationFrom = function restoreConfigurationFrom(configurationInfo) {
          this.name = configurationInfo.getValue("name");
          this.resourceGroup = configurationInfo.getValue("resourceGroup");
          this.header = configurationInfo.getValue("header");
          this.minHeight = configurationInfo.getInt("minHeight");
          this.stateType = configurationInfo.getValue("stateType");
          this.showHeader = configurationInfo.getBool("showHeader");

          this.dataHolder = configurationInfo.getValue("dataHolder");
          this.dataSource = configurationInfo.getValue("dataSource");
          this.dataFilter = configurationInfo.getValue("dataFilter");
          this.dataMapper = configurationInfo.getScript("dataMapper");

          this.stateStorage = configurationInfo.getValue("stateStorage");
        };

        _createClass(Widget, [{
          key: 'self',
          get: function get() {
            return this;
          }
        }]);

        return Widget;
      }(Configurable));

      _export('Widget', Widget);
    }
  };
});