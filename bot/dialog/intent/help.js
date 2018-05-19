'use strict';

const builder = require('botbuilder');
const message = require('../../constant/message');

module.exports = help;

function help(session) {
  {
    const helpMsg = message.help;
    const name = session.message.address.user.name;
    const suggestions = [];
    for (const msg of helpMsg) {
      suggestions.push(builder.CardAction.imBack(session, msg, msg));
    }
    const msg = new builder.Message(session)
      .text(`Dear ${name}! Please specify if we can help you with any thing?`)
      .suggestedActions(
        builder.SuggestedActions.create(
          session, suggestions
        ));
    session.send(msg);
    session.endDialog();
  }
}
