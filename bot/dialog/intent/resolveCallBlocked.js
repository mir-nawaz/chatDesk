'use strict';

module.exports = [resolveCallBlock];

function resolveCallBlock(session) {
  if (session.userData.conversation !== session.message.address.conversation.id) {
    session.userData = {};
    session.userData.conversation = session.message.address.conversation.id;
    session.userData.gotIssue = true;
  }
  if (!session.userData.lastProblemAsked) {
    session.beginDialog('/lastProblem');
  }
  else {
    session.beginDialog('/askContact');
  }
}
