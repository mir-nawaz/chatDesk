'use strict';

const _ = require('lodash');

module.exports = function(session) {
  const index = _.findIndex(session.userData.problems, { userId: session.message.address.user.id });
  return index >= 0 ? _.get(session, `userData.problems[${index}].lastProblem`) : '';
};
