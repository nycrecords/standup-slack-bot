'use strict';
var sinon = require('sinon');

module.exports = function() {
  this.Given('the bot is running', function() {
    module.exports.botController = { };
    module.exports.botController.hears = sinon.spy();
    module.exports.botController.on = sinon.spy();

    var bot = {
      reply: sinon.spy()
    };

    module.exports.botController.hears.__bot = bot;
    module.exports.botController.on.__bot = bot;
  });

  this.Given('I am in a room with the bot', function() {

  });

  this.Then(/the bot should respond "([^"]+)"/, function(responseContains) {
    var botReply = module.exports.botController.hears.__bot.reply.args[0][1];
    if(botReply.indexOf(responseContains) >= 0) {
      return true;
    } else {
      console.log(botReply);
      throw new Error('Bot reply did not contain "' + responseContains + '"');
    }
  });
};

module.exports.botController = null;

module.exports.getHandler = function(fn) {
  return fn.args[0][fn.args[0].length - 1];
};

module.exports.botRepliesToHearing = function(message, method, done) {
  if(!done && typeof method === 'function') {
    done = method;
    method = module.exports.botController.hears;
  }

  var fn = module.exports.getHandler(method);
  fn(method.__bot, message);

  module.exports.wait(function() { return method.__bot.reply.called; }, function() {
    done();
  });
};

module.exports.wait = function(until, done) {
  if(until()) {
    done();
  } else {
    setTimeout(function() {
      module.exports.wait(until, done);
    }, 10);
  }
};
