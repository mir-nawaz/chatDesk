'use strict';

const builder = require('botbuilder');
const lang = require('../lang');
const config = require('../../../config');

module.exports = greeting;

function greeting(session) {

  const card = {
    'contentType': 'application/vnd.microsoft.card.adaptive',
    'content': {
      '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
      'type': 'AdaptiveCard',
      'version': '1.0',
      'body': [
        {
          'type': 'Container',
          'speak': `<s>${lang.getText('hello')} ${session.message.address.user.name}!</s><s>${lang.getText('helpMe')}</s>`,
          'items': [
            {
              'type': 'ColumnSet',
              'columns': [
                {
                  'type': 'Column',
                  'size': 'auto',
                  'items': [
                    {
                      'type': 'Image',
                      'url': config.botImg,
                      'size': 'medium',
                      'style': 'person'
                    }
                  ]
                },
                {
                  'type': 'Column',
                  'size': 'stretch',
                  'items': [
                    {
                      'type': 'TextBlock',
                      'text': `${lang.getText('hello')} ${session.message.address.user.name}!`,
                      'weight': 'bolder',
                      'isSubtle': true
                    },
                    {
                      'type': 'TextBlock',
                      'text': lang.getText('helpMe'),
                      'wrap': true
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  };
  const reply = new builder.Message(session)
    .addAttachment(card);
  session.send(reply);
}
