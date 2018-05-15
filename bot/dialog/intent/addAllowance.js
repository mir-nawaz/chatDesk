'use strict';

const builder = require('botbuilder');

module.exports = [
  function(session, results, next) {
    builder.Prompts.choice(session, `Your allowance has finished for number ${session.userData.contact}. Would you like to try new bundles`, 'Bundle 1|Bundle 2|Later', { listStyle: builder.ListStyle.button });
  },
  function(session, results, next) {
    const selection = results.response.entity;
    if (selection !== 'Later') {
      const msg = new builder.Message(session);

      msg.attachmentLayout(builder.AttachmentLayout.carousel);
      msg.attachments([
        new builder.HeroCard(session)
          .title('')
          .subtitle('')
          .text('Would you like to add Bundle 1')
          .images([builder.CardImage.create(session, 'https://i.imgur.com/mudabG3.png')])
          .buttons([
            builder.CardAction.imBack(session, 'Bundle 1', 'Upgrade')
          ]),
        new builder.HeroCard(session)
          .title('')
          .subtitle('')
          .text('Would you like to add Bundle 2')
          .images([builder.CardImage.create(session, 'https://i.imgur.com/DA9CBuL.png')])
          .buttons([
            builder.CardAction.imBack(session, 'Bundle2', 'Upgrade')
          ])

      ]);
      session.send(msg);
    }
    else {
      session.endDialog();
      session.beginDialog('/goodbye');
    }
  },
  function(session, results, next) {
    const selection = results.response.entity;
    if (selection === 'Bundle 1') {
      const msg = new builder.Message(session);
      msg.attachmentLayout(builder.AttachmentLayout.carousel);
      msg.attachments([
        new builder.HeroCard(session)
          .title('')
          .subtitle('')
          .text('Adding Bundle 1 to the package')
          .images([builder.CardImage.create(session, 'https://i.imgur.com/C6rPJOO.png')])

      ]);

      session.send(msg);
    }
    if (selection === 'Bundle 2') {
      const msg = new builder.Message(session);
      msg.attachmentLayout(builder.AttachmentLayout.carousel);
      msg.attachments([
        new builder.HeroCard(session)
          .title('')
          .subtitle('')
          .text('Adding Bundle 2 to the package')
          .images([builder.CardImage.create(session, 'https://i.imgur.com/C6rPJOO.png')])

      ]);

      session.send(msg);
    }
    next();

  },
  function(session) {
    session.beginDialog('/goodbye');
  }
];
