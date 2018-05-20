'use strict';

const message = require('../../constant/message');
const _ = require('lodash');

module.exports = lastProblem;

function lastProblem() {
  const rand = Math.floor(Math.random() * (message.internalCheck.length - 1));
  // return [_.get(message, `internalCheck[${rand}]`), _.get(message, `internalCheck[${rand + 1}]`)];
  return [_.get(message, `internalCheck[${rand}]`)];
}
