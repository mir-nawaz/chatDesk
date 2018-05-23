'use strict';

const _ = require('lodash');

module.exports = function(text) {
  return _.lowerCase(_.trim(text));
};
