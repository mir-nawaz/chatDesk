'use strict';

const builder = require('botbuilder');
const lang = require('../lang');

module.exports = [
  function(session, results, next) {
    session.send(lang.getText('playVideoHandSet'));
    const msg = new builder.Message(session).addAttachment(

      new builder.VideoCard(session)
        .title('Try a different Handset')
        .subtitle('')
        .text('Watch this amazing movie which will be replaced by an actual help manual but now enjoy without thinking so much about it')
        .image(builder.CardImage.create(session, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/220px-Big_buck_bunny_poster_big.jpg'))
        .media([{ url: 'http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4' }])
        .buttons([
          builder.CardAction.openUrl(session, 'https://peach.blender.org/', 'Learn More')
        ])
    );

    session.send(msg);

  },
  function(session, results, next) {

    builder.Prompts.choice(session, 'Did it helper', 'Yes|No', { listStyle: builder.ListStyle.button });

  },
  function(session, results, next) {

    session.beginDialog('/goodbye');

  }
];
