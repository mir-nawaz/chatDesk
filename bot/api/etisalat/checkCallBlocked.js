'use strict';

const message = require('../../constant/message');
const _ = require('lodash');

module.exports = callBlockedCheck;

function callBlockedCheck(session) {
  return new Promise((resolve) => {
    const index = Math.floor(Math.random() * (message.internalCheck.length - 1));
    if (session.conversationData.callIssuesChecked) {
      resolve(session.conversationData.callIssues);
    }
    else {
      session.conversationData.callIssuesChecked = true;
      resolve([_.get(message, `internalCheck[${index}]`), _.get(message, `internalCheck[${index + 1}]`)]);
    }
  });
}
