'use strict';

module.exports = [

  function(session, results, next) {
    session.send('Your Issues has been reported. Thank you for using Etisalat !!!');
  }

];
