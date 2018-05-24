'use strict';

const message = require('../../constant/message');
const _ = require('lodash');

module.exports = callBlockedCheck;

function callBlockedCheck(session) {
  return new Promise((resolve) => {
    const index = Math.floor(Math.random() * (message.internalCheck.length));
    resolve(_.get(message, `internalCheck[${index}]`, ''));
  });
}
