'use strict';

const checkCall = require('../../api/etisalat/checkCallBlocked');

module.exports = [callBlocked];

function callBlocked(session) {
  checkCall(session)
    .then((blockIssues) => {
      session.conversationData.callIssues = blockIssues;
      const responseText = session.conversationData.callIssues[0];

      session.conversationData.callIssues = blockIssues.splice(0, 1);
      session.conversationData.callIssues = blockIssues;

      switch (responseText) {
        case 'Outgoing barred due to charges':
          session.beginDialog('/payBill');
          break;
        case 'Number barred due to registration docs':
          session.beginDialog('/updateDocs');
          break;
        case 'Sim is not voice enabled':
          session.beginDialog('/enableVoice');
          break;
        case 'Usage cap reached':
          session.beginDialog('/usageCapped');
          break;
        case 'Allowance finished':
          session.beginDialog('/addAllowance');
          break;
        case 'Network Outage':
          session.beginDialog('/wait');
          break;
        case 'SIM Blocked on stolen':
          session.beginDialog('/restoreSIM');
          break;
        case 'SIM Blocked by company':
          session.beginDialog('/restoreSIM');
          break;
        case 'Handset Issue':
          session.beginDialog('/changeHandset');
          break;
        case 'Temporary congestion':
          session.beginDialog('/technicalComplaint');
          break;
        default:
          session.beginDialog('/goodbye');
      }
    });
}
