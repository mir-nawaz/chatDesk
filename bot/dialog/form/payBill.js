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
        text: 'Pay Bill',
        wrap: true,
        weight: 'bolder'
      },
      {
        type: 'TextBlock',
        text: 'Credit Card Number',
        wrap: true
      },
      {
        type: 'Input.Text',
        id: 'creditCard',
        placeholder: 'please enter credit card number',
        maxLength: 14
      },
      {
        type: 'TextBlock',
        text: 'Card Expiry Date'
      },
      {
        type: 'Input.Date',
        id: 'cardExpiry'
      },
      {
        type: 'TextBlock',
        text: 'CVV'
      },
      {
        type: 'Input.Text',
        id: 'CVVNumber',
        placeholder: 'Please enter CVV',
        maxLength: 4
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
