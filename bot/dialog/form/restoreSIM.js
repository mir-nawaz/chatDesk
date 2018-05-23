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
        text: 'Restore SIM',
        wrap: true,
        weight: 'bolder'
      },
      {
        type: 'TextBlock',
        text: 'Date of Birth',
        wrap: true
      },
      {
        type: 'Input.Date',
        id: 'dateOfBirth',
        placeholder: 'Please provide your date of birth'
      },
      {
        type: 'TextBlock',
        text: 'Pet Name'
      },
      {
        type: 'Input.Text',
        id: 'petName',
        placeholder: 'please provide your pet name',
        maxLength: 14
      },
      {
        type: 'TextBlock',
        text: 'Last Month Bill'
      },
      {
        type: 'Input.Text',
        id: 'lastMonthBill',
        placeholder: 'Please provide last month bill',
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
