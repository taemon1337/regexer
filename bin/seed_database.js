#!/usr/bin/env node
var request = require('request');

if (process.argv.length !== 2) {
  throw new Error('Usage: node ' + __filename + ' <jsonfile> <url>');
}

var jsonfile = process.argv[0];
var url = process.argv[1];
var json = require(jsonfile);

json.forEach(function (record) {
  request.post(url, record).then(function (resp) {
    console.log(resp)
  }).catch(function (err) {
    console.warn('Error: ', err)
  });
});
