'use strict';

const lang = require('../lang');
const builder = require('botbuilder');
const form = require('../form');
const _ = require('lodash');

module.exports = [
  function(session, results, next) {
    if (session.conversationData.feedback) {
      next();
      return;
    }
    const feedback = _.get(session, 'message.value.feedback');
    if (feedback) {
      session.conversationData.feedback = feedback;
      next();
      return;
    }
    const msg = new builder.Message(session)
      .addAttachment(form.feedback);
    session.send(msg);
  },
  function(session, results, next) {

    const lastProblemShow = session.conversationData.lastProblemShow || false;
    const callIssuesChecked = session.conversationData.callIssuesChecked || false;
    const issuesReported = session.conversationData.issuesReported || false;
    const feedback = session.conversationData.feedback || '';

    session.conversationData = {};

    session.conversationData.lastProblemShow = lastProblemShow;
    session.conversationData.callIssuesChecked = callIssuesChecked;
    session.conversationData.issuesReported = issuesReported;
    session.conversationData.feedback = feedback;

    if (session.conversationData.issuesReported) {
      session.send(lang.getText('thankReportIssue'));
    }
    else {
      session.send(lang.getText('thankYou')); // check for time and send response
    }
  }

];
