'use strict';

var mongoUrl = process.env.MONGOHQ_URL || 'mongodb://localhost/sept';
var path = require('path');
var rootPath = path.normalize(__dirname + '/../../..');
var appPath = path.join(rootPath, 'dist');

module.exports = {
  db: mongoUrl,
  appPath: appPath,
  soundCloud: {
    clientID: 'ce5d783419dc34dd43bd4a08b559e454',
    clientSecret: '3add9adc5b16e082a28cd7153b96da10',
    callbackURL: 'http://sept-web-radio.herokuapp.com/soundcloud/auth/callback'
  }
};