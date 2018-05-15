'use strict';

module.exports = [
  function(session, args, next) {
    session.send('You call is blocked due to insuficient balance');
    session.endDialog();
  }
];
