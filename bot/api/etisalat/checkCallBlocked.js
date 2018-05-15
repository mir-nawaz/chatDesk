'use strict';

const message = require('../../constant/message');
const _ = require('lodash');

module.exports = callBlockedCheck;

function callBlockedCheck() {
  return new Promise((resolve) => {
    const index = Math.floor(Math.random() * (message.internalCheck.length - 1));
    resolve([_.get(message, `internalCheck[${index}]`), _.get(message, `internalCheck[${index + 1}]`)]);
  });
}
