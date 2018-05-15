'use strict';

const checkCall = require('../../api/etisalat/checkCallBlocked');
const builder = require('botbuilder');

module.exports = [callBlocked];

function callBlocked(session) {
  checkCall()
    .then((blockIssues) => {
      const suggestions = [];
      const { name } = session.message.address.user;
      for (const msg of blockIssues) {
        suggestions.push(builder.CardAction.imBack(session, msg, msg));
      }
      const msg = new builder.Message(session)
        .text(`Dear ${name}! We found the below problems with your SIM, Please select to resolve.`)
        .suggestedActions(
          builder.SuggestedActions.create(
            session, suggestions
          ));
      session.send(msg);
      session.endDialog();
    });
}
