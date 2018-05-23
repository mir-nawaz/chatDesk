'use strict';

const builder = require('botbuilder');
const config = require('../../../config');
const lang = require('../lang');

module.exports = conversationUpdate;

function conversationUpdate(message, bot) {
  if (message.membersAdded) {
    message.membersAdded.forEach(function(identity) {
      if (identity.id === message.address.bot.id) {

        const card = {
          'contentType': 'application/vnd.microsoft.card.adaptive',
          'content': {
            '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
            'type': 'AdaptiveCard',
            'version': '1.0',
            'body': [
              {
                'type': 'Container',
                'speak': `<s>${lang.getText('hello')}!</s><s>${lang.getText('welcome')}</s>`,
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
                            'text': `${lang.getText('hello')}!`,
                            'weight': 'bolder',
                            'isSubtle': true
                          },
                          {
                            'type': 'TextBlock',
                            'text': lang.getText('welcome'),
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
        const reply = new builder.Message()
          .address(message.address)
          .addAttachment(card);
        bot.send(reply);
      }
    });
  }
}

