'use strict';

const message = require('../../constant/message');
const _ = require('lodash');

module.exports = lastProblem;

function lastProblem() {
  const index = Math.floor(Math.random() * (message.help.length + 1));
  return _.get(message, `help[${index}]`, 'Other');
}
