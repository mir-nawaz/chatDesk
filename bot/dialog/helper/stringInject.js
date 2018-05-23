'use strict';

module.exports = function(str, data) {
  if (typeof str === 'string' && (data instanceof Array)) {
    return str.replace(/({\d})/g, function(i) {
      return data[i.replace(/{/, '').replace(/}/, '')];
    });
  }
  else if (typeof str === 'string' && (data instanceof Object)) {
    for (const key in data) {
      return str.replace(/({([^}]+)})/g, function(i) {
        const key = i.replace(/{/, '').replace(/}/, '');
        if (!data[key]) {
          return i;
        }
        return data[key];
      });
    }
  }
  else {
    return false;
  }
  return str;
};
