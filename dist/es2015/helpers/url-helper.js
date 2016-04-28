export let UrlHelper = class UrlHelper {

  static objectToQuery(ar) {
    return encodeURIComponent(JSON.stringify(ar));
  }

  static queryToObject(queryParam) {
    return JSON.parse(queryParam);
  }

  static getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

};