'use strict';

const builder = require('botbuilder');
const internalCheck = require('../../api/etisalat/internalCheck');

module.exports = function(session) {
  if (!session.userData.contact) {
    session.beginDialog('/askContact');
  }
  else {
    const internalIssues = internalCheck();
    const suggestions = [];
    for (const msg of internalIssues) {
      suggestions.push(builder.CardAction.imBack(session, msg, msg));
    }
    const msg = new builder.Message(session)
      .text('We have found below issues with you SIM, Please select to resolve')
      .suggestedActions(
        builder.SuggestedActions.create(
          session, suggestions
        ));
    session.send(msg);
    session.endDialog();
  }
};
