'use strict';

const builder = require('botbuilder');

module.exports = [
  function(session, args, next) {
    if (!session.userData.contact) {
      builder.Prompts.text(session, 'Please share your contact number which has issue?');
    }
    else {
      next();
    }
  },
  function(session, results) {

    const contact = results.response || session.userData.contact;
    session.userData.contact = contact;

    if (contact) {
      builder.Prompts.choice(session, `Please confirm '${contact}' has issue`, 'yes|no', { listStyle: builder.ListStyle.button });
    }
    else {
      session.userData = {};
      session.beginDialog('/askContact');
    }
  },
  function(session, results) {
    const res = results.response.entity || results.response;
    if (res === 'no') {
      session.userData.contact = undefined;
      session.beginDialog('/askContact');
    }
    else {
      session.beginDialog('/internalCheck');
    }
  }
];
