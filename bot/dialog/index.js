'use strict';

const { callBlocked, defaultIntent, addAllowance, changeHandset } = require('./intent');

const waitIntent = require('./intent/wait');
const helpIntent = require('./intent/help');
const greetingIntent = require('./intent/greeting');
const goodByeIntent = require('./intent/goodBye');
const lastProblemIntent = require('./intent/lastProblem');
const errorMessageIntent = require('./intent/errorMessage');
const payBillIntent = require('./intent/payBill');
const updateDocsIntent = require('./intent/updateDocs');
const enableVoiceIntent = require('./intent/enableVoice');
const usageCappedIntent = require('./intent/usageCapped');
const restoreSIMIntent = require('./intent/restoreSIM');
const technicalComplaintIntent = require('./intent/technicalComplaint');
const datapackageIntent = require('./intent/datapackage');
const newdatapackageIntent = require('./intent/newdatapackage');

const upgradeplanIntent = require('./intent/upgradeplan');

const conversationUpdate = require('./events/conversationUpdate');
const { send, receive, botbuilder, findEntities } = require('./middleware');

const _ = require('lodash');

module.exports = {
  routes: routes
};

function routes(bot) {
// Add a dialog for each intent that the LUIS app recognizes.
// See https://docs.microsoft.com/en-us/bot-framework/nodejs/bot-builder-nodejs-recognize-intent-luis

  bot.endConversationAction('goodbye', 'Goodbye :)', { matches: /^goodbye/i });
  bot.beginDialogAction('help', '/help', { matches: /^help/i });

  bot.on('conversationUpdate', (message) => conversationUpdate(message, bot));

  bot.use({ receive: receive, botbuilder: botbuilder, send: send });

  bot.dialog('/', defaultIntent);

  bot.dialog('/callBlocked', _.concat([findEntities], callBlocked))
    .triggerAction({ matches: 'callBlocked' });

  bot.dialog('/dataPackage', datapackageIntent)
    .triggerAction({ matches: 'dataPackage' });

  bot.dialog('/newDataPackage', newdatapackageIntent)
    .triggerAction({ matches: 'newDataPackage' });

  bot.dialog('/upGradePlan', upgradeplanIntent)
    .triggerAction({ matches: 'upGradePlan' });

  bot.dialog('/goodbye', goodByeIntent);
  bot.dialog('/lastProblem', lastProblemIntent);
  bot.dialog('/errorMessage', errorMessageIntent);

  bot.dialog('/help', helpIntent)
    .triggerAction({ matches: 'help' });

  bot.dialog('/Greeting', greetingIntent)
    .triggerAction({ matches: 'Greeting' });

  bot.dialog('/payBill', payBillIntent)
    .triggerAction({ matches: 'payBill' });

  bot.dialog('/updateDocs', updateDocsIntent)
    .triggerAction({ matches: 'updateDocs' });

  bot.dialog('/enableVoice', enableVoiceIntent)
    .triggerAction({ matches: 'enableVoice' });

  bot.dialog('/usageCapped', usageCappedIntent)
    .triggerAction({ matches: 'usageCapped' });

  bot.dialog('/addAllowance', addAllowance)
    .triggerAction({ matches: 'addAllowance' });

  bot.dialog('/wait', waitIntent)
    .triggerAction({ matches: 'wait' });

  bot.dialog('/restoreSIM', restoreSIMIntent)
    .triggerAction({ matches: 'restoreSIM' });

  bot.dialog('/technicalComplaint', technicalComplaintIntent)
    .triggerAction({ matches: 'technicalComplaint' });

  bot.dialog('/changeHandset', changeHandset)
    .triggerAction({ matches: 'changeHandset' });

}

