'use strict';

module.exports = botbuilder;

function botbuilder(session, next) {
  session.send();
  session.sendTyping();
  next();
}
