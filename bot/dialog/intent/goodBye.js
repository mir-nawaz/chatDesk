'use strict';

module.exports = [

  function(session, results, next) {
    const lastProblemShow = session.conversationData.lastProblemShow || false;
    const callIssuesChecked = session.conversationData.callIssuesChecked || false;
    const issuesReported = session.conversationData.issuesReported || false;
    session.conversationData = {};
    session.conversationData.lastProblemShow = lastProblemShow;
    session.conversationData.callIssuesChecked = callIssuesChecked;
    session.conversationData.issuesReported = issuesReported;
    if (session.conversationData.issuesReported) {
      session.send('Thank you for using Etisalat. Your issue has been reported. Have a nice day !!!');
    }
    else {
      session.send('Thank you for using Etisalat. Have a nice day !!!'); // check for time and send response
    }
  }

];
