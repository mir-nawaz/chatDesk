'use strict';

const builder = require('botbuilder');
const message = require('../../constant/message');
const lang = require('../lang');
const stringInject = require('../helper/stringInject');

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
      .text(stringInject(lang.getText('helpMsg'), { name: name }))
      .suggestedActions(
        builder.SuggestedActions.create(
          session, suggestions
        ));
    session.send(msg);
    session.endDialog();
  }
}
