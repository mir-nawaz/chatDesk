'use strict';

module.exports = greeting;

function greeting(session) {
  session.endDialog(`Hello ${session.message.address.user.name}! Please type your issue or type 'help me' for details`);
}
