'use strict';

var log = require('../../getLogger')('join channel');

module.exports = function(controller, botName) {
  controller.on('bot_channel_join', function (bot, message) {
    log.info('Joined channel ' + message.channel);
    return bot.reply(message, {
      text: ':wave: Hi! To set up a standup, say `@'+botName+' create standup [time]`\n'+
        'For more information, say `@'+botName+' help`'
    });
  });
  log.verbose('Attached');
};
