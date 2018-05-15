'use strict';

const message = require('../../constant/message');
const _ = require('lodash');

module.exports = lastProblem;

function lastProblem() {
  const index = Math.floor(Math.random() * (message.internalCheck.length - 1));
  return [_.get(message, `internalCheck[${index}]`), _.get(message, `internalCheck[${index + 1}]`)];
}
