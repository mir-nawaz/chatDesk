'use strict';

const builder = require('botbuilder');

function identifyAllEntities(session, args, next) {

  const intent = args.intent;
  if (intent) {
    const planType = builder.EntityRecognizer.findEntity(intent.entities, 'PlanType');
    if (planType) {
      session.userData.planType = planType;
    }

    const phonenumber = builder.EntityRecognizer.findEntity(intent.entities, 'phoneNumber');
    if (phonenumber) {
      session.userData.contact = phonenumber;
    }

  }

}

module.exports = [
  function(session, args, next) {
    identifyAllEntities(session, args, next);
    if (!session.userData.contact) {
      builder.Prompts.text(session, 'Can you please specify the mobile number?');
    }
    else {
      next();
    }
  },
  function(session, args, next) {

    session.userData.contact = args.response || session.userData.contact;

    if (!session.userData.planType) {
      const msg = new builder.Message(session);

      msg.attachmentLayout(builder.AttachmentLayout.carousel);
      msg.attachments([
        new builder.HeroCard(session)
          .title('')
          .subtitle('')
          .text('Would you like to upgrade to the new plan')
          .images([builder.CardImage.create(session, 'https://i.imgur.com/mudabG3.png')])
          .buttons([
            builder.CardAction.imBack(session, 'Upgrade to National 2 GB Plan', 'Upgrade')
          ]),
        new builder.HeroCard(session)
          .title('')
          .subtitle('')
          .text('Would you like to upgrade to the new plan')
          .images([builder.CardImage.create(session, 'https://i.imgur.com/DA9CBuL.png')])
          .buttons([
            builder.CardAction.imBack(session, 'Upgrade to National 15 GB Plan', 'Upgrade')
          ])

      ]);
      session.userData.planType = '';
      session.send(msg).endDialog();
    }
    else {
      next();
    }

  },
  function(session, results, next) {
    JSON.stringify(session.userData.planType.entity);
    builder.Prompts.choice(session, 'Are you sure you want to upgrade to plan ' + session.userData.planType.entity, 'YES|NO', { listStyle: builder.ListStyle.button });
  },
  function(session, results, next) {

    const userSelection = results.response.entity;
    if (userSelection === 'YES') {
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
    }
    else {
      next();
    }
  },
  function(session) {
    session.userData.planType = '';
    session.beginDialog('/goodbye');
  }
];
