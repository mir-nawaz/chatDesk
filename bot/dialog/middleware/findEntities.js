'use strict';

const _ = require('lodash');

module.exports = identifyAllEntities;

function identifyAllEntities(session, args, next) {
  session.conversationData = session.conversationData || {};
  const entities = _.get(args, 'intent.entities', []);

  for (const entity of entities) {
    session.conversationData[entity.type] = entity.entity;
  }

  next();
}
