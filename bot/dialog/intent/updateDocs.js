'use strict';

const builder = require('botbuilder');

module.exports = [
  function(session, results, next) {

    builder.Prompts.choice(session, `Your calls are barred due to registration documents expirty on number ${session.userData.contact} would you like to provide latest documents`, 'Update Now|Update later', { listStyle: builder.ListStyle.button });

  },
  function(session, results, next) {

    const selection = results.response.entity;
    if (selection === 'Update Now') {
      builder.Prompts.attachment(session, 'Kindly upload the revised emirates Id');
    }
    else {
      session.beginDialog('/goodbye');
    }

  },
  function(session, results, next) {

    const msg = session.message;
    if (msg.attachments && msg.attachments.length > 0) {
      // Echo back attachment
      const attachment = msg.attachments[0];
      session.send({
        text: 'The following document is recieved with Emirates id = 239438493849384',
        attachments: [
          {
            contentType: attachment.contentType,
            contentUrl: attachment.contentUrl,
            name: attachment.name
          }
        ]
      });
      next();
    }
    else {
      // Echo back users text
      session.send('No attachment detected');
      session.endDialog();
      session.beginDialog('/updateDocs');
    }

  },
  function(session, results, next) {

    session.send('Thank you for uploading the latest documents. Your line will be activated in the next 2 hours');
    next();
  },
  function(session) {
    session.userData.planType = '';
    session.beginDialog('/goodbye');
  }
];
