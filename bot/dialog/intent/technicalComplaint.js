'use strict';

module.exports = [
  function(session) {
    session.conversationData.technicalComplaint = true;
    session.send('We are launching a technical complain with number 23984398493. We will get back to you once it is resolved');
    session.beginDialog('/proactive');
  }
];
