'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataSourceConfiguration = exports.Datasource = undefined;

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _dataHolder = require('./data-holder');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Datasource = exports.Datasource = function () {
  function Datasource(datasourceConfiguration) {
    _classCallCheck(this, Datasource);

    this._liveRequest = {};

    this.name = datasourceConfiguration.name;
    this.transport = datasourceConfiguration.transport;
    this.cache = datasourceConfiguration.cache;
  }

  Datasource.prototype.getData = function getData(query) {
    var _this = this;

    if (!this.transport && !this.transport.readService) throw "readService is not configured";

    var cacheKey = this.transport.readService.url + query.cacheKey();

    if (!this.cache) {
      return this._doWebRequest(cacheKey, query);
    } else {
      if (this._liveRequest[cacheKey]) {
        this._liveRequest[cacheKey] = this._liveRequest[cacheKey].then(function (l) {
          return _this._fromCache(cacheKey);
        }).then(function (data) {
          return _this._processData(cacheKey, query, data);
        }, function (err) {
          return _this._doWebRequest(cacheKey, query);
        });
        return this._liveRequest[cacheKey];
      }
      try {
        var data = this._fromCache(cacheKey);
        return Promise.resolve(data).then(function (d) {
          return _this._processData(cacheKey, query, d);
        });
      } catch (ex) {}
      this._liveRequest[cacheKey] = this._doWebRequest(cacheKey, query);
      return this._liveRequest[cacheKey];
    }
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

  Datasource.prototype._doWebRequest = function _doWebRequest(cacheKey, query) {
    var _this2 = this;

    return this.transport.readService.read({
      fields: query.fields,
      filter: query.filter,
      take: query.take,
      skip: query.skip,
      sort: query.sort,
      sortDir: query.sortDir
    }).then(function (d) {
      return _this2._processData(cacheKey, query, d);
    });
  };

  Datasource.prototype._processData = function _processData(cacheKey, query, jsonData) {
    this._liveRequest[cacheKey] = null;
    this._setCache(jsonData, cacheKey);
    var dataHolder = new _dataHolder.DataHolder();
    dataHolder.query = query;
    dataHolder.data = _.isArray(jsonData.data) ? jsonData.data : [jsonData.data];
    dataHolder.total = jsonData.total;
    return dataHolder;
  };

  Datasource.prototype._fromCache = function _fromCache(cacheKey) {
    var storage = this.cache.cacheManager.getStorage();
    var d = storage.getItem(cacheKey);
    if (d) return d;
    throw "data not found: " + cacheKey;
  };

  Datasource.prototype._setCache = function _setCache(data, cacheKey) {
    if (this.cache && this.cache.cacheManager) {
      var storage = this.cache.cacheManager.getStorage();
      storage.setItem(cacheKey, data, this.cache.cacheTimeSeconds);
    }
  };

  return Datasource;
}();

var DataSourceConfiguration = exports.DataSourceConfiguration = function DataSourceConfiguration() {
  _classCallCheck(this, DataSourceConfiguration);
};