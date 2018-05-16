'use strict';

const builder = require('botbuilder');

module.exports = [
  function(session, args, next) {

    if (!session.userData.contact) {
      builder.Prompts.text(session, 'Can you please specify the mobile number?');
    }
    else {
      next();
    }
  },
  function(session, results) {

    session.userData.contact = results.response || session.userData.contact;

    const msg = new builder.Message(session);
    msg.attachmentLayout(builder.AttachmentLayout.carousel);
    msg.attachments([
      new builder.HeroCard(session)
        .title('Suggested data plan')
        .subtitle('suggested data')
        .text('Would you like to upgrade to the new plan')
        .images([builder.CardImage.create(session, 'https://i.imgur.com/ADAcUTl.png')])
        .buttons([
          builder.CardAction.imBack(session, 'Upgrade to Samsung Gold Standard Plan', 'Upgrade')
        ])
    ]);

    session.send(msg).endDialog();
  },
  function(session) {
    session.beginDialog('/goodbye');
  }
];
