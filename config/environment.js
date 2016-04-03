var _ = require('lodash');

var localEnvVars = {
  TITLE:      'mintv2',
  SAFE_TITLE: 'mintv2'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
