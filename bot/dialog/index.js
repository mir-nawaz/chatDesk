'use strict';

const intents = require('./intent');

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

  bot.dialog('/', intents.default);
  bot.dialog('/goodbye', intents.goodBye);
  bot.dialog('/lastProblem', intents.lastProblem);
  bot.dialog('/errorMessage', intents.errorMessage);

  // LUIS integrated intents
  bot.dialog('/callBlocked', _.concat([findEntities], intents.callBlocked))
    .triggerAction({ matches: 'callBlocked' });
  bot.dialog('/dataPackage', intents.dataPackage)
    .triggerAction({ matches: 'dataPackage' });
  bot.dialog('/newDataPackage', intents.newDataPackage)
    .triggerAction({ matches: 'newDataPackage' });
  bot.dialog('/upGradePlan', intents.upgradePlan)
    .triggerAction({ matches: 'upGradePlan' });
  bot.dialog('/help', intents.help)
    .triggerAction({ matches: 'help' });
  bot.dialog('/greeting', intents.greeting)
    .triggerAction({ matches: 'greeting' });
  bot.dialog('/payBill', intents.payBill)
    .triggerAction({ matches: 'payBill' });
  bot.dialog('/updateDocs', intents.updateDocs)
    .triggerAction({ matches: 'updateDocs' });
  bot.dialog('/enableVoice', intents.enableVoice)
    .triggerAction({ matches: 'enableVoice' });
  bot.dialog('/usageCapped', intents.usageCapped)
    .triggerAction({ matches: 'usageCapped' });
  bot.dialog('/addAllowance', intents.addAllowance)
    .triggerAction({ matches: 'addAllowance' });
  bot.dialog('/wait', intents.wait)
    .triggerAction({ matches: 'wait' });
  bot.dialog('/restoreSIM', intents.restoreSIM)
    .triggerAction({ matches: 'restoreSIM' });
  bot.dialog('/technicalComplaint', intents.technicalComplaint)
    .triggerAction({ matches: 'technicalComplaint' });
  bot.dialog('/changeHandset', intents.changeHandset)
    .triggerAction({ matches: 'changeHandset' });

}

