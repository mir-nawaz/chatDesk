'use strict';

const _ = require('lodash');

module.exports = function(lastProblem, blockIssues = [], session) {

  session.conversationData.callIssues = blockIssues.splice(0, 1);
  session.conversationData.callIssues = blockIssues;

  if (lastProblem) {
    session.userData.problems = session.userData.problems || [];
    const index = _.findIndex(session.userData.problems, { userId: session.message.address.user.id });
    if (index >= 0) {
      session.userData.problems[index].lastProblem = lastProblem;
    }
    else {
      session.userData.problems.push({ userId: session.message.address.user.id, lastProblem: lastProblem });
    }
  }
};
