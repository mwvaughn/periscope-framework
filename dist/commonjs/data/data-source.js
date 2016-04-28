'use strict';

exports.__esModule = true;
exports.DataSourceConfiguration = exports.Datasource = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _dataHolder = require('./data-holder');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Datasource = exports.Datasource = function () {
  function Datasource(datasourceConfiguration) {
    _classCallCheck(this, Datasource);

    this._name = datasourceConfiguration.name;
    this._transport = datasourceConfiguration.transport;
    this._schemeConfig = datasourceConfiguration.schemeConfig;
    this._cache = datasourceConfiguration.cache;
  }

  Datasource.prototype.createDataHolder = function createDataHolder() {
    return new _dataHolder.DataHolder(this);
  };

  Datasource.prototype.cacheOn = function cacheOn(cacheKey) {
    if (this._cache && this._cache.cacheManager) {
      var storage = this._cache.cacheManager.getStorage();
      return storage.getItem(cacheKey);
    }
  };

  Datasource.prototype.getData = function getData(query) {
    var _this = this;

    var dataHolder = new _dataHolder.DataHolder();
    dataHolder.query = query;

    if (!this.transport && !this.transport.readService) throw "readService is not configured";

    var storage = void 0;
    var cacheKey = this.transport.readService.url + query.cacheKey();
    if (this._cache && this._cache.cacheManager) {
      storage = this._cache.cacheManager.getStorage();
      var cachedDataHolder = storage.getItem(cacheKey);
      if (cachedDataHolder) {
        dataHolder.data = cachedDataHolder.data;
        dataHolder.total = cachedDataHolder.total;
        return new Promise(function (resolve, reject) {
          resolve(dataHolder);
        });
      }
    }
    return this.transport.readService.read({
      fields: query.fields,
      filter: query.serverSideFilter ? query.serverSideFilter : "",
      take: query.take,
      skip: query.skip,
      sort: query.sort,
      sortDir: query.sortDir
    }).then(function (d) {
      dataHolder.data = _.isArray(d.data) ? d.data : [d.data];
      dataHolder.total = d.total;
      if (storage) storage.setItem(cacheKey, { data: dataHolder.data, total: dataHolder.total }, _this._cache.cacheTimeSeconds);
      return dataHolder;
    });
  };

  Datasource.prototype.create = function create(entity) {
    if (!this.transport && !this.transport.createService) throw "createService is not configured";
    return this.transport.createService.create(entity);
  };

  Datasource.prototype.update = function update(id, entity) {
    if (!this.transport && !this.transport.updateService) throw "updateService is not configured";
    return this.transport.updateService.update(id, entity);
  };

  Datasource.prototype.delete = function _delete(id, entity) {
    if (!this.transport && !this.transport.deleteService) throw "deleteService is not configured";
    return this.transport.updateService.delete(entity);
  };

  _createClass(Datasource, [{
    key: 'name',
    get: function get() {
      return this._name;
    }
  }, {
    key: 'transport',
    get: function get() {
      return this._transport;
    }
  }, {
    key: 'cacheManager',
    get: function get() {
      return this._cacheManager;
    }
  }]);

  return Datasource;
}();

var DataSourceConfiguration = exports.DataSourceConfiguration = function () {
  function DataSourceConfiguration() {
    _classCallCheck(this, DataSourceConfiguration);
  }

  _createClass(DataSourceConfiguration, [{
    key: 'cache',
    get: function get() {
      return this._cache;
    },
    set: function set(value) {
      this._cache = value;
    }
  }, {
    key: 'transport',
    get: function get() {
      return this._transport;
    },
    set: function set(value) {
      this._transport = value;
    }
  }, {
    key: 'name',
    get: function get() {
      return this._name;
    },
    set: function set(value) {
      this._name = value;
    }
  }]);

  return DataSourceConfiguration;
}();