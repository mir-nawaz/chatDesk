'use strict';

module.exports = [

  function(session, results, next) {
    session.send('Please specify if we can help you with any thing else?');
  }

];
