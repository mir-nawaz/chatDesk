'use strict';

module.exports = [defaultInt];

function defaultInt(session) {
  session.beginDialog('/help');
}
