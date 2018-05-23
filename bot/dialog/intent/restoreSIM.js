'use strict';

const builder = require('botbuilder');
const form = require('../form');
const lowerTrim = require('../helper/lowerTrim');
const _ = require('lodash');

function processSubmitAction(session, value) {
  const defaultErrorMessage = 'Please complete all the input parameters';

  if (!value.dateOfBirth || !value.petName || !value.lastMonthBill) {
    session.send(defaultErrorMessage);
  }
  else {
    session.conversationData.dateOfBirth = value.dateOfBirth;
    session.conversationData.petName = value.petName;
    session.conversationData.lastMonthBill = value.lastMonthBill;

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
    session.beginDialog('/goodbye');
  }
}

module.exports = [
  function(session, results, next) {
    if (session.message && session.message.value) {
      // A Card's Submit Action obj was received
      processSubmitAction(session, session.message.value);
      return;
    }
    builder.Prompts.choice(session, `Looks like your SIM on number ${session.conversationData.phoneNumber} is blocked would you like to restore`, 'Now|Later', { listStyle: builder.ListStyle.button });
  },
  function(session, results, next) {

    const selection = _.get(results, 'response.entity') || _.get(results, 'response');
    if (lowerTrim(selection) === 'now') {
      const msg = new builder.Message(session)
        .addAttachment(form.restoreSIM);
      session.send(msg);
    }
    else {
      session.beginDialog('/goodbye');
    }

  }
];
