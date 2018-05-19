'use strict';

const builder = require('botbuilder');

module.exports = [
  function(session, results, next) {
    const billAMount = Math.floor(Math.random() * 100);
    session.userData.billAmount = billAMount;
    builder.Prompts.choice(session, `Your calls are barred due to non bill payment. You have outstanding of ${billAMount}.00 AED on number ${session.conversationData.phoneNumber} would you like to pay`, 'Pay now|Pay later', { listStyle: builder.ListStyle.button });
  },
  function(session, results, next) {

    const selection = results.response.entity;
    if (selection === 'Pay now') {
      builder.Prompts.text(session, 'Please enter your credit card number?');
    }
    else {
      session.beginDialog('/goodbye');
    }

  },
  function(session, results, next) {
    session.userData.cardNumber = results.response;
    builder.Prompts.text(session, 'Please enter your card expiry date (MM/YY)');
  },
  function(session, results, next) {
    session.userData.expiryDate = results.response;
    builder.Prompts.text(session, 'Please enter your CVV');
  },
  function(session, results, next) {

    session.userData.CVV = results.response;
    builder.Prompts.choice(session, `You are paying bill for  ${session.userData.billAmount}.00 AED using Credit Card Number ${session.userData.cardNumber}`, 'YES|NO', { listStyle: builder.ListStyle.button });

  },
  function(session, results, next) {

    const userselection = results.response.entity;
    if (userselection === 'YES') {
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
    session.userData.planType = '';
    session.beginDialog('/callBlocked');
  }
];
