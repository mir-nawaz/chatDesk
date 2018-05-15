'use strict';

const _ = require('lodash');

module.exports = [
  function(session, args, next) {

    const { title = 'Mr.', company, name } = _.get(session, 'message.address.user', {});

    let responseText = `${title} ${name}`;

    responseText += company ? ` from ${company}, ` : ', ';
    responseText += 'Welcome to Etisalat help desk, How can i help you!!';

    session.send(responseText);

    // TODO save last problem of user and send show to user
    // session.send('last problem' + ' How may i help you now?');
    session.endDialog();

  }
];
