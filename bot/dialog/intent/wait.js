'use strict';

module.exports = [
  function(session) {
    session.send('Please wait a complaint with complaint number 923839238938493 is launched and we will get back to you once issue is resolved');
    session.beginDialog('/callBlocked');
  }
];
