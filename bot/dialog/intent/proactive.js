'use strict';

const _ = require('lodash');

module.exports = [
  function(session, args, next) {

    const { title = 'Mr.', company, name } = _.get(session, 'message.address.user', {});

    let responseText = `${title} ${name}`;

    responseText += company ? ` from ${company}, ` : ', ';

    function sendMsg() {
      if (session.conversationData.wait) {
        responseText += ' The issue with the network outage is resolved.';
        session.send(responseText);
        session.beginDialog('/goodbye');
        session.conversationData.wait = false;
      }
      if (session.conversationData.technicalComplaint) {
        responseText += ' You complaint number 923839238938493 is resolved.';
        session.send(responseText);
        session.beginDialog('/goodbye');
        session.conversationData.technicalComplaint = false;
      }

      tryAgain();
    }

    function tryAgain() {
      setTimeout(function() {
        return sendMsg();
      }, 6000);
    }

    tryAgain();

    next();
  }
];
