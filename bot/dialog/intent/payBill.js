'use strict';

const builder = require('botbuilder');
const lowerTrim = require('../helper/lowerTrim');
const _ = require('lodash');
const form = require('../form');

function processSubmitAction(session, value) {
  const defaultErrorMessage = 'Please complete all the input parameters';
  if (!value.creditCard || !value.cardExpiry || !value.CVVNumber) {
    session.send(defaultErrorMessage);
  }
  else {
    session.conversationData.creditCard = value.creditCard;
    session.conversationData.cardExpiry = value.cardExpiry;
    session.conversationData.CVVNumber = value.CVVNumber;
    const billAMount = Math.floor(Math.random() * 100);
    builder.Prompts.choice(session, `You are paying bill for  ${billAMount}.00 AED using Credit Card Number ${session.conversationData.creditCard}`, 'YES|NO', { listStyle: builder.ListStyle.button });
  }
}

module.exports = [
  function(session, results, next) {
    const billAMount = Math.floor(Math.random() * 100);
    session.userData.billAmount = billAMount;
    if (session.message && session.message.value) {
      // A Card's Submit Action obj was received
      processSubmitAction(session, session.message.value);
      return;
    }
    builder.Prompts.choice(session, `Your calls are barred due to non bill payment. You have outstanding of ${billAMount}.00 AED on number ${session.conversationData.phoneNumber} would you like to pay`, 'Pay now|Pay later', { listStyle: builder.ListStyle.button });
  },
  function(session, results, next) {

    const selection = _.get(results, 'response.entity') || _.get(results, 'response');

    if (lowerTrim(selection) === 'pay now' || lowerTrim(selection) === 'pay' || lowerTrim(selection) === 'now') {
      const msg = new builder.Message(session)
        .addAttachment(form.payBill);
      session.send(msg);
    }
    else {
      const userSelection = _.get(results, 'response.entity') || _.get(results, 'response');
      if (lowerTrim(userSelection) === 'yes') {
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
    }
  },
  function(session) {
    session.userData.planType = '';
    session.beginDialog('/goodbye');
  }
];
