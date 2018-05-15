'use strict';

const builder = require('botbuilder');
const lastProblem = require('../../api/etisalat/lastProblem');

module.exports = [
  function(session) {
    if (session.userData.lastProblemAsked) {
      session.beginDialog('/help');
    }
    else {
      session.userData.lastProblemAsked = true;
      builder.Prompts.choice(session, `Dear ${session.message.address.user.name}! It seems like you had a problem previously '${lastProblem()}', is it resolved now!`, 'yes|no', { listStyle: builder.ListStyle.button });
    }
  },
  function(session, results, next) {
    const res = results.response.entity || results.response;
    if (res === 'no') {
      session.send('Sorry for the inconvenience, I have report your issue again.');
    }
    next();
  },
  function(session) {
    if (session.userData.gotIssue) {
      session.beginDialog('/resolveCallBlocked');
    }
    else {
      session.beginDialog('/greetings');
    }
  }
];
