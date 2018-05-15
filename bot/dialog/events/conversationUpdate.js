'use strict';

const builder = require('botbuilder');

module.exports = conversationUpdate;

function conversationUpdate(message, bot) {
  if (message.membersAdded) {
    message.membersAdded.forEach(function(identity) {
      if (identity.id === message.address.bot.id) {
        const reply = new builder.Message()
          .address(message.address)
          .text('Welcome to Etisalat help desk, How can i help you!!');
        bot.send(reply);
      }
    });
  }
}

