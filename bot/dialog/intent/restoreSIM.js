'use strict';

const builder = require('botbuilder');

module.exports = [
  function(session, results, next) {
    builder.Prompts.choice(session, `Looks like your SIM on number ${session.conversationData.phoneNumber} is blocked would you like to restore`, 'Now|Later', { listStyle: builder.ListStyle.button });
  },
  function(session, results, next) {

    const selection = results.response.entity;
    if (selection === 'Now') {
      builder.Prompts.text(session, 'We would like to ask few verification questions, Please provide your date of birth');
    }
    else {
      session.beginDialog('/goodbye');
    }

  },
  function(session, results, next) {
    builder.Prompts.text(session, 'Please specify your pet name');
  },
  function(session, results, next) {
    builder.Prompts.text(session, 'Please specify your last month bill value');
  },
  function(session, results, next) {

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
    next();

  },
  function(session) {
    session.userData.planType = '';
    session.beginDialog('/callBlocked');
  }
];
