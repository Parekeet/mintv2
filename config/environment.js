var _ = require('lodash');

var localEnvVars = {
  TITLE:      'mintv2',
  SAFE_TITLE: 'mintv2',
  COOKIE_SECRET:  'notsosecretnowareyou',
  SESSION_SECRET: 'anotherfoolishsecret',
  TOKEN_SECRET:   'andafinalsecretsadasitis'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
