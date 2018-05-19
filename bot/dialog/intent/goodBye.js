'use strict';

module.exports = [

  function(session, results, next) {
    const lastProblemShow = session.conversationData.lastProblemShow || false;
    const callIssuesChecked = session.conversationData.callIssuesChecked || false;
    session.conversationData = {};
    session.conversationData.lastProblemShow = lastProblemShow;
    session.conversationData.callIssuesChecked = callIssuesChecked;
    session.send('Thank you for using Etisalat. Have a nice day !!!'); // check for time and send response
  }

];
