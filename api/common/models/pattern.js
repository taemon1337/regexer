'use strict';

module.exports = function(Pattern) {
  Pattern.validatesUniquenessOf('name', {message: 'name is not unique'});
};
