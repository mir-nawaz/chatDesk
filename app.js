'use strict';

/* -----------------------------------------------------------------------------
A simple Language Understanding (LUIS) bot for the Microsoft Bot Framework.
-----------------------------------------------------------------------------*/

const _ = require('lodash');
const restify = require('restify');
const builder = require('botbuilder');
const botbuilderAzure = require('botbuilder-azure');
const localConfig = require('./config');
const dialog = require('./bot/dialog');

// get param from cli to run on localhost
const env = _.get(process, 'argv[2]');

// read from process.env for production
let config = process.env;

if (env === 'localhost') {
  // change config for local development environment
  config = localConfig;
}

// Setup Restify Server
const server = restify.createServer();
server.listen(config.port || 3978, function() {
  console.log('%s listening to %s', server.name, server.url); // eslint-disable-line no-console
});

// Create chat connector for communicating with the Bot Framework Service
const connector = new builder.ChatConnector({
  appId: config.MicrosoftAppId,
  appPassword: config.MicrosoftAppPassword,
  openIdMetadata: config.BotOpenIdMetadata
});

// Listen for messages from users
server.post('/api/messages', connector.listen());

/* ----------------------------------------------------------------------------------------
* Bot Storage: This is a great spot to register the private state storage for your bot.
* We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
* For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
* ---------------------------------------------------------------------------------------- */

const tableName = 'botdata';
const azureTableClient = new botbuilderAzure.AzureTableClient(tableName, config['AzureWebJobsStorage']);
const tableStorage = new botbuilderAzure.AzureBotStorage({ gzipData: false }, azureTableClient);

const inMemoryStorage = new builder.MemoryBotStorage();

// Create your bot with a function to receive messages from the user
// This default message handler is invoked if the user's utterance doesn't
// match any intents handled by other dialogs.
const bot = new builder.UniversalBot(connector);

if (config.inMemory) {
  bot.set('storage', inMemoryStorage);
}
else {
  bot.set('storage', tableStorage);
}

// Make sure you add code to validate these fields
const luisAppId = config.LuisAppId;
const luisAPIKey = config.LuisAPIKey;
const luisAPIHostName = config.LuisAPIHostName || 'westus.api.cognitive.microsoft.com';

const LuisModelUrl = 'https://' + luisAPIHostName + '/luis/v2.0/apps/' + luisAppId + '?subscription-key=' + luisAPIKey;

// Create a recognizer that gets intents from LUIS, and add it to the bot
const recognizer = new builder.LuisRecognizer(LuisModelUrl);
bot.recognizer(recognizer);

dialog.routes(bot);
