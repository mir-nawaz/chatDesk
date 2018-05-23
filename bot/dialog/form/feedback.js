'use strict';

module.exports = {
  contentType: 'application/vnd.microsoft.card.adaptive',
  content: {
    $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
    type: 'AdaptiveCard',
    version: '1.0',
    body: [
      {
        type: 'TextBlock',
        text: 'Feedback',
        wrap: true,
        weight: 'bolder'
      },
      {
        type: 'TextBlock',
        text: 'How was the interaction?',
        wrap: true
      },
      {
        type: 'Input.Text',
        id: 'feedback',
        placeholder: 'please provide your feedback',
        maxLength: 500,
        isMultiline: true
      }
    ],
    actions: [
      {
        type: 'Action.Submit',
        title: 'Submit'
      }
    ]
  }
};
