'use strict';

module.exports = function(Enrich) {
  Enrich.validatesUniquenessOf('name', {message: 'name is not unique'});
};
