'use strict';

const { callBlocked, defaultIntent } = require('./intent');

const waitIntent = require('./intent/wait');
const helpIntent = require('./intent/help');
const greetingIntent = require('./intent/greeting');
const askContactIntent = require('./intent/askContact');
const goodByeIntent = require('./intent/goodBye');
const lastProblemIntent = require('./intent/lastProblem');
const errorMessageIntent = require('./intent/errorMessage');
const internalCheckIntent = require('./intent/internalCheck');
const payBillIntent = require('./intent/payBill');
const updateDocsIntent = require('./intent/updateDocs');
const enableVoiceIntent = require('./intent/enableVoice');
const usageCappedIntent = require('./intent/usageCapped');
const addAllowanceIntent = require('./intent/addAllowance');
const restoreSIMIntent = require('./intent/restoreSIM');
const technicalComplaintIntent = require('./intent/technicalComplaint');
const changeHandsetIntent = require('./intent/changeHandset');
const datapackageIntent = require('./intent/datapackage');
const newdatapackageIntent = require('./intent/newdatapackage');

const upgradeplanIntent = require('./intent/upgradeplan');
const proactiveIntent = require('./intent/proactive');

const conversationUpdate = require('./events/conversationUpdate');
const { send, receive, botbuilder, findEntities } = require('./middleware');

const _ = require('lodash');

module.exports = {
  routes: routes
};

function routes(bot) {
// Add a dialog for each intent that the LUIS app recognizes.
// See https://docs.microsoft.com/en-us/bot-framework/nodejs/bot-builder-nodejs-recognize-intent-luis

  // bot.endConversationAction('goodbye', 'Goodbye :)', { matches: /^goodbye/i });
  // bot.beginDialogAction('help', '/help', { matches: /^help/i });

  bot.on('conversationUpdate', (message) => conversationUpdate(message, bot));

  bot.use({ receive: receive, botbuilder: botbuilder, send: send });

  bot.dialog('/', defaultIntent);

  bot.dialog('/callBlocked', _.concat([findEntities], callBlocked))
    .triggerAction({ matches: 'callBlocked' });

  // -------------------------
  bot.dialog('/proactive', proactiveIntent);

  bot.dialog('/datapackage', datapackageIntent)
    .triggerAction({ matches: 'datapackage' });

  bot.dialog('/newdatapackage', newdatapackageIntent)
    .triggerAction({ matches: 'newdatapackage' });

  bot.dialog('/upgradeplan', upgradeplanIntent)
    .triggerAction({ matches: 'upgradeplan' });

  bot.dialog('/askContact', askContactIntent);
  bot.dialog('/goodbye', goodByeIntent);
  bot.dialog('/lastProblem', lastProblemIntent);
  bot.dialog('/errorMessage', errorMessageIntent);

  bot.dialog('/help', helpIntent);
  //  .triggerAction({ matches: 'help' });

  bot.dialog('/Greeting', greetingIntent)
    .triggerAction({ matches: 'Greeting' });

  bot.dialog('/internalCheck', internalCheckIntent);
  //  .triggerAction({ matches: 'internalCheck' });

  bot.dialog('/payBill', payBillIntent);
  //  .triggerAction({ matches: 'payBill' });

  bot.dialog('/updateDocs', updateDocsIntent);
  // .triggerAction({ matches: 'updateDocs' });

  bot.dialog('/enableVoice', enableVoiceIntent);
  // .triggerAction({ matches: 'enableVoice' });

  bot.dialog('/usageCapped', usageCappedIntent);
  // .triggerAction({ matches: 'usageCapped' });

  bot.dialog('/addAllowance', addAllowanceIntent);
  // .triggerAction({ matches: 'addAllowance' });

  bot.dialog('/wait', waitIntent);
  // .triggerAction({ matches: 'wait' });

  bot.dialog('/restoreSIM', restoreSIMIntent);
  // /.triggerAction({ matches: 'restoreSIM' });

  bot.dialog('/technicalComplaint', technicalComplaintIntent);
  // .triggerAction({ matches: 'technicalComplaint' });

  bot.dialog('/changeHandset', changeHandsetIntent);
  // .triggerAction({ matches: 'changeHandset' });

}

