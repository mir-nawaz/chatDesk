'use strict';

const builder = require('botbuilder');
const message = require('../../constant/message');
const lang = require('../lang');
const stringInject = require('../helper/stringInject');

module.exports = help;

function help(session) {

  const helpMsg = message.help;
  const name = session.message.address.user.name;
  session.send(stringInject(lang.getText('helpMsg'), { name: name }));
  const suggestions = [];
  const msg = new builder.Message(session);
  for (const msg of helpMsg) {
    suggestions.push(new builder.HeroCard(session)
      .text(msg)
      .buttons([
        builder.CardAction.imBack(session, msg, 'Get Started')
      ]));
  }
  msg.attachmentLayout(builder.AttachmentLayout.carousel);
  msg.attachments(suggestions);

  session.send(msg);
  session.endDialog();

}
