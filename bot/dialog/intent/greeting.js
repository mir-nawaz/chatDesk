'use strict';

module.exports = greeting;

function greeting(session) {

  /* if (!session.userData.lastProblemAsked) {
    session.beginDialog('/lastProblem');
  }
  else */
  if (session.userData.greeted) {
    session.beginDialog('/help');
  }
  else {
    session.userData.greeted = true;
    session.endDialog(`Hello ${session.message.address.user.name}! Please type your issue or type 'help me' for details`);
  }

}
