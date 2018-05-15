'use strict';

module.exports = conversationUpdate;

function conversationUpdate(message, bot) {
  if (message.membersAdded) {
    message.membersAdded.forEach(function(identity) {
      if (identity.id === message.address.bot.id) {
        bot.beginDialog(message.address, '/proactive');
      }
    });
  }
}

