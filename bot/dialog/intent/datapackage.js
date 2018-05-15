'use strict';

const builder = require('botbuilder');

function identifyAllEntities(session, args, next) {

  const intent = args.intent;
  if (intent) {
    const socialMedia = builder.EntityRecognizer.findEntity(intent.entities, 'SocialMedia');
    if (socialMedia) {
      session.userData.isSocialMedia = true;
      session.userData.isSocialMediaType = socialMedia;

    }

    const dataProblems = builder.EntityRecognizer.findEntity(intent.entities, 'DataProblems');
    if (dataProblems) {
      session.userData.isdataProblems = true;
    }

    const details = builder.EntityRecognizer.findEntity(intent.entities, 'Details');
    if (details) {
      session.userData.isdetails = true;
    }

    const comparativePattern = builder.EntityRecognizer.findEntity(intent.entities, 'ComparativePattern');
    if (comparativePattern) {
      session.userData.iscomparativePattern = true;
      session.userData.iscomparativePeriod = comparativePattern;
    }

    const breakup = builder.EntityRecognizer.findEntity(intent.entities, 'breakup');
    if (breakup) {
      session.userData.isbreakup = true;
    }

    const phonenumber = builder.EntityRecognizer.findEntity(intent.entities, 'phoneNumber');
    if (phonenumber) {
      session.userData.contact = phonenumber;
    }

  }

}

function resetAllEntities(session) {

  session.userData.isSocialMedia = false;
  session.userData.isSocialMediaType = '';
  session.userData.isdataProblems = false;
  session.userData.iscomparativePattern = false;
  session.userData.iscomparativePeriod = '';
  session.userData.isbreakup = false;
  session.userData.isdetails = false;

}

function sendComparison(msg, session, results) {
  session.send('Here you go');
  msg.attachmentLayout(builder.AttachmentLayout.carousel);
  msg.attachments([
    new builder.HeroCard(session)
      .title('Data Usage Pattern')
      .subtitle('Data usage from 1st to 31st July')
      .text('By the way do you want to move to a new plan')
      .images([builder.CardImage.create(session, 'https://i.imgur.com/bZJBVih.png')])
      .buttons([
        builder.CardAction.imBack(session, 'Suggest a new data Pacakage', 'Suggest')
      ])
  ]);
}

function dataProblems(msg, session, results) {

  session.send('The following is your current data usage based on your package');
  msg.attachmentLayout(builder.AttachmentLayout.carousel);
  msg.attachments([
    new builder.HeroCard(session)
      .title('Current Data Plan')
      .subtitle('Data Usage')
      .text('By the way do you want to move to a better plan')
      .images([builder.CardImage.create(session, 'https://i.imgur.com/HcDZ8Dg.png')])
      .buttons([
        builder.CardAction.imBack(session, 'Suggest a new data Pacakage', 'Suggest')
      ])

  ]);

}

function socialMedia(msg, session, results) {

  session.send('The following is your current data usage based on social media-espcially' + session.userData.isSocialMediaType);

  msg.attachmentLayout(builder.AttachmentLayout.carousel);
  msg.attachments([
    new builder.HeroCard(session)
      .title('Current Data Plan')
      .subtitle('Data Usage for Social Media')
      .text('Do you want to know complete details of the current plan')
      .images([builder.CardImage.create(session, 'https://i.imgur.com/XJ7AI9i.png')])
      .buttons([
        builder.CardAction.imBack(session, 'What is my current data Plan', 'What is my current Plan')
      ])
  ]);
  session.userData.isSocialMedia = false;

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
  function(session, results) {

    session.userData.contact = results.response || session.userData.contact;
    const msg = new builder.Message(session);
    let isHandled = false;

    if (session.userData.isSocialMedia === true) {
      socialMedia(msg, session, results);
      isHandled = true;
    }

    if (session.userData.iscomparativePattern === true) {
      sendComparison(msg, session, results);
      isHandled = true;
    }

    if (session.userData.isdataProblems === true || session.userData.isdetails === true) {
      dataProblems(msg, session, results);
      isHandled = true;
    }
    if (isHandled) {
      session.send(msg).endDialog();
    }
    else {
      builder.Prompts.choice(session, 'Would you like to find more details about', 'Suggested new plan | Comparison of usage for last month | Social Media usage of the data plan', { listStyle: builder.ListStyle.button });
      session.endDialog();
    }
    resetAllEntities(session);
  }
];
