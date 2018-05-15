'use strict';

const users = require('./data/Users.json');

function getLastProblemForUser(userId, session) {
  return 'last problem';
}

function getRandomUserJSON(users) {
  const max = users.length;
  return users[getRandomInt(0, max)];
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
}

module.exports = [
  function(session, args, next) {

    const userJSON = getRandomUserJSON(users);
    const responseText = `Mr ${userJSON.user} from ${userJSON.org}, Welcome to Etisalat help desk, How can i help you!!`;
    session.userData.user = userJSON.user;
    session.userData.org = userJSON.org;

    session.send(responseText);

    const responseText2 = getLastProblemForUser(userJSON.user, session);
    if (responseText2 !== '') {
      session.send(responseText2 + ' How may i help you now?');
      session.endDialog();
    }

  }
];
