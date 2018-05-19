'use strict';

const builder = require('botbuilder');

module.exports = [
  function(session, results, next) {
    builder.Prompts.choice(session, `Your SIM is not voice enabled  on number ${session.userData.contact}. Would you like to enable voice`, 'Now|Later', { listStyle: builder.ListStyle.button });
  },
  function(session, results, next) {
    const selection = results.response.entity;
    if (selection === 'Now') {
      const msg = new builder.Message(session);
      msg.attachmentLayout(builder.AttachmentLayout.carousel);
      msg.attachments([
        new builder.HeroCard(session)
          .title('')
          .subtitle('')
          .text('')
          .images([builder.CardImage.create(session, 'https://i.imgur.com/C6rPJOO.png')])

      ]);

      session.send(msg);
    }
    next();

  },
  function(session) {
    session.beginDialog('/callBlocked');
  }
];
