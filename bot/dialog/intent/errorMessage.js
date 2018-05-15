'use strict';

const builder = require('botbuilder');

module.exports = [
  function(session) {
    if (!session.userData.contact) {
      session.beginDialog('/askContact');
    }
    else {
      builder.Prompts.text(session, `Please share error message you are receiving for '${session.userData.contact}'`);
    }
  },
  function(session, results) {
    session.userData.errorMessage = results.response;
    session.send('Internal checking');
    // session.beginDialog('/askContact');
  }
];
