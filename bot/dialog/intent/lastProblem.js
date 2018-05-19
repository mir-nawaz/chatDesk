'use strict';

const builder = require('botbuilder');
const getLastProblem = require('../service/getLastProblem');
const _ = require('lodash');

module.exports = [
  function(session, args, next) {
    const lastProblem = getLastProblem(session);
    if (lastProblem && !session.conversationData.lastProblemShow) {
      session.conversationData.lastProblemShow = true;
      builder.Prompts.choice(session, `Dear ${session.message.address.user.name}! It seems like you had a problem previously '${lastProblem}', is it resolved now!`, 'yes|no', { listStyle: builder.ListStyle.button });
    }
    else {
      next();
    }
  },
  function(session, results, next) {
    const res = _.get(results, 'response.entity') || _.get(results, 'response');
    if (res === 'no') {
      session.send('Sorry for the inconvenience, I have report your issue again.');
    }
    next();
  }
];
