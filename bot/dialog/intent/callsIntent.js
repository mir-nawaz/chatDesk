'use strict';

const builder = require('botbuilder');

const lineproblems = require('./data/LineProblems.json');

function identifyAllEntities(session, args, next) {

  const intent = args.intent;
  if (intent) {
    const lineProblem = builder.EntityRecognizer.findEntity(intent.entities, 'LineProblem');
    if (lineProblem) {
      session.userData.lineProblem = lineProblem;
    }

    const callType = builder.EntityRecognizer.findEntity(intent.entities, 'callType');
    if (callType) {
      session.userData.callType = callType;
    }

    const charges = builder.EntityRecognizer.findEntity(intent.entities, 'charges');
    if (charges) {
      session.userData.charges = charges;
    }

    const phonenumber = builder.EntityRecognizer.findEntity(intent.entities, 'phoneNumber');
    if (phonenumber) {
      session.userData.contact = phonenumber;
    }

  }

}

function getRandomLineIssue(json, session) {

  const min = 0;
  const max = lineproblems.length;
  const probjson = lineproblems[getRandomInt(session, min, max)];

  const respText = probjson.P;
  session.userData.lastproblem = 'LINE';
  session.userData.lastproblemDetail = probjson.P;

  return respText;
}

function getRandomInt(session, min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (session.userData.myroundrobin) {
    session.userData.myroundrobin += 1;
  }
  else {
    session.userData.myroundrobin = 1;
  }
  if (session.userData.myroundrobin === max) {
    session.userData.myroundrobin = 1;
  }

  return session.userData.myroundrobin - 1;
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

    const responseText = getRandomLineIssue(session.userData.user, session);

    switch (responseText) {
      case 'Outgoing barred due to charges':
        session.beginDialog('/payBill');
        return;
      case 'Number barred due to registration docs':
        session.beginDialog('/updateDocs');
        return;
      case 'Sim is not voice enabled':
        session.beginDialog('/enableVoice');
        return;
      case 'Usage cap reached':
        session.beginDialog('/usageCapped');
        return;
      case 'Allownace finished':
        session.beginDialog('/addAllowance');
        return;
      case 'Network Outage':
        session.beginDialog('/wait');
        return;
      case 'SIM Blocked on stolen':
        session.beginDialog('/restoreSIM');
        return;
      case 'SIM Blocked by company':
        session.beginDialog('/restoreSIM');
        return;
      case 'Handset Issue':
        session.beginDialog('/changeHandset');
        return;
      case 'Temporary congestion':
        session.beginDialog('/technicalComplaint');
        return;
      default:
        session.beginDialog('/help');
        return;
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
