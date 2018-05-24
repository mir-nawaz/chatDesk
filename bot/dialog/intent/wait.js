'use strict';

module.exports = [
  function(session) {
    session.conversationData.wait = true;
    session.send('Please wait network is outage. We will get back to you once issue is resolved');
    session.beginDialog('/proactive');
  }
];
