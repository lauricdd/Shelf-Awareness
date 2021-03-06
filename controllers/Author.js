'use strict';

var utils = require('../utils/writer.js');
var AuthorService = require('../service/AuthorService');

module.exports.authorsGET = function authorsGET(req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;

  AuthorService.authorsGET(offset, limit)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAuthorById = function getAuthorById(req, res, next) {
  var authorId = req.swagger.params['authorId'].value;
  // console.log("authorId " + authorId);
  AuthorService.getAuthorById(authorId)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};