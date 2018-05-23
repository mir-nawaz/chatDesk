'use strict';

const builder = require('botbuilder');
const lang = require('../lang');
const stringInject = require('../helper/stringInject');
const lowerTrim = require('../helper/lowerTrim');
const _ = require('lodash');

module.exports = [
  function(session, results, next) {
    builder.Prompts.choice(session, stringInject(lang.getText('addAllowance'), { phoneNumber: session.conversationData.phoneNumber }), 'Bundle 1|Bundle 2|Later', { listStyle: builder.ListStyle.button });
  },
  function(session, results, next) {
    const selection = _.get(results, 'response.entity') || _.get(results, 'response');
    if (lowerTrim(selection) !== 'later') {
      const msg = new builder.Message(session);

      msg.attachmentLayout(builder.AttachmentLayout.carousel);
      msg.attachments([
        new builder.HeroCard(session)
          .title('')
          .subtitle('')
          .text(lang.getText('addBundle1'))
          .images([builder.CardImage.create(session, 'https://i.imgur.com/mudabG3.png')])
          .buttons([
            builder.CardAction.imBack(session, 'Bundle 1', 'Bundle 1')
          ]),
        new builder.HeroCard(session)
          .title('')
          .subtitle('')
          .text(lang.getText('addBundle2'))
          .images([builder.CardImage.create(session, 'https://i.imgur.com/DA9CBuL.png')])
          .buttons([
            builder.CardAction.imBack(session, 'Bundle 2', 'Bundle 2')
          ])

      ]);
      builder.Prompts.choice(session, msg, ['Bundle 1', 'Bundle 2'], { retryPrompt: msg });
    }
    else {
      session.endDialog();
      session.beginDialog('/goodbye');
    }
  },
  function(session, results, next) {
    const selection = _.get(results, 'response.entity') || _.get(results, 'response');
    if (lowerTrim(selection) === 'bundle 1') {
      const msg = new builder.Message(session);
      msg.attachmentLayout(builder.AttachmentLayout.carousel);
      msg.attachments([
        new builder.HeroCard(session)
          .title('')
          .subtitle('')
          .text(lang.getText('addingBundle1'))
          .images([builder.CardImage.create(session, 'https://i.imgur.com/C6rPJOO.png')])

      ]);

      session.send(msg);
    }
    if (lowerTrim(selection) === 'bundle 2') {
      const msg = new builder.Message(session);
      msg.attachmentLayout(builder.AttachmentLayout.carousel);
      msg.attachments([
        new builder.HeroCard(session)
          .title('')
          .subtitle('')
          .text(lang.getText('addingBundle2'))
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
