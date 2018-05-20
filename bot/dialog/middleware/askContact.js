'use strict';

const builder = require('botbuilder');
const _ = require('lodash');

module.exports = [
  function(session, args, next) {
    if (!_.get(session, 'conversationData.phoneNumber')) {
      builder.Prompts.text(session, 'Please share your contact number which has issue?');
    }
    else {
      next();
    }
  },
  function(session, results, next) {
    if (results.response) {
      session.conversationData.phoneNumber = results.response;
      next();
    }
    else if (session.conversationData.issuesReported) {
      next();
    }
    else if (!_.get(session, 'conversationData.phoneNumberConfirm')) {
      builder.Prompts.choice(session, `Please confirm your contact number '${session.conversationData.phoneNumber}' `, 'yes|no', { listStyle: builder.ListStyle.button });
    }
    else {
      next();
    }
  },
  function(session, results, next) {
    let response = _.get(results, 'response.entity');
    response = response || _.get(results, 'response');
    if (response && response === 'yes') {
      session.conversationData.phoneNumberConfirm = true;
    }
    if (response && response === 'no') {
      session.conversationData.phoneNumberConfirm = false;
      session.conversationData.phoneNumber = '';
      const lastState = _.get(session, 'sessionState.callstack[0].id');
      const lastURl = _.get(_.split(lastState, ':', 2), '[1]', '/callBlocked');
      session.replaceDialog(lastURl);
    }
    else {
      next();
    }
  }
];
