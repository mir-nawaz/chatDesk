'use strict';

const builder = require('botbuilder');

module.exports = [
  function(session) {
    const msg = new builder.Message(session);
    msg.attachmentLayout(builder.AttachmentLayout.carousel);
    msg.attachments([
      new builder.HeroCard(session)
        .title('Suggested data plan')
        .subtitle('suggested data')
        .text('Would you like to upgrade to the new plan')
        .images([builder.CardImage.create(session, 'https://i.imgur.com/ADAcUTl.png')])
        .buttons([
          builder.CardAction.imBack(session, 'Upgrade', 'Upgrade')
        ])
    ]);
    builder.Prompts.choice(session, msg, ['Upgrade'], { retryPrompt: msg });
  },
  function(session, results) {
    session.beginDialog('/goodbye');
  }
];
