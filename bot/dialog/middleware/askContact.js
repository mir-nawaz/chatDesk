'use strict';

const builder = require('botbuilder');
const _ = require('lodash');
const lang = require('../lang');
const stringInject = require('../helper/stringInject');
const lowerTrim = require('../helper/lowerTrim');

module.exports = [
  function(session, args, next) {
    if (!_.get(session, 'conversationData.phoneNumber')) {
      builder.Prompts.text(session, lang.getText('askContactNumber'));
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
    else if (!_.get(session, 'conversationData.phoneNumberConfirm')) {
      builder.Prompts.choice(session, stringInject(lang.getText('confirmContactNumber'), session.conversationData), 'yes|no', { listStyle: builder.ListStyle.button });
    }
    else {
      next();
    }
  },
  function(session, results, next) {
    let response = _.get(results, 'response.entity');
    response = response || _.get(results, 'response');
    if (response && lowerTrim(response) === 'yes') {
      next();
    }
    if (response && lowerTrim(response) === 'no') {
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
