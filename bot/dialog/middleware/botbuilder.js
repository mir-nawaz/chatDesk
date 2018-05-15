'use strict';

module.exports = botbuilder;

function botbuilder(session, next) {
  if (session.userData.conversation !== session.message.address.conversation.id) {
    session.userData = {};
    session.userData.conversation = session.message.address.conversation.id;
  }
  next();
}
