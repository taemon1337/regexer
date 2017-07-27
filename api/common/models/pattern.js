'use strict';

const crypto = require('crypto');

module.exports = function(Pattern) {
  Pattern.validatesUniquenessOf('name', {message: 'name is not unique'});
  
  Pattern.observe('before save', function (self, next) {
    if (self.instance) {
      self.instance.regex_sha256 = crypto.createHash('sha256').update(self.instance.regex_string).digest('hex');
    }
    next();
  });
};
