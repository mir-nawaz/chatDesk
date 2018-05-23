'use strict';

const builder = require('botbuilder');
const getLastProblem = require('../service/getLastProblem');
const _ = require('lodash');
const lang = require('../lang');
const stringInject = require('../helper/stringInject');

module.exports = [
  function(session, args, next) {
    const lastProblem = getLastProblem(session);
    if (lastProblem && !session.conversationData.lastProblemShow) {
      session.conversationData.lastProblemShow = true;
      builder.Prompts.choice(session, stringInject(lang.getText('lastProblem'), { lastProblem: lastProblem, name: session.message.address.user.name }), 'yes|no', { listStyle: builder.ListStyle.button });
    }
    else {
      next();
    }
  },
  function(session, results, next) {
    const res = _.get(results, 'response.entity') || _.get(results, 'response');
    if (res === 'no') {
      session.send(lang.getText('sorryMsg'));
    }
    next();
  }
];
