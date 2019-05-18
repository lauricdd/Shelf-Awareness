'use strict';

var utils = require('../utils/writer.js');
var UserService = require('../service/UserService');

module.exports.userLoginPOST = function userLoginPOST(req, res, next) {
  var username = req.swagger.params["email"].value;
  var password = req.swagger.params["password"].value;
  if(!req.session.loggedin) {
      req.session.loggedin = true;
  } else {
     req.session.loggedin = !req.session.loggedin;
  }
  UserService.userLoginPOST(username, password)
    .then(function(response) {
      req.session.username = response[0].name;
      req.session.id = response[0].id;
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.logoutUserGET = function logoutUserGET (req, res, next) {
  var userId = req.session.id;
  if(userId!=undefined){
        console.log("usao");
        console.log(userId!=undefined);
        req.session.loggedin = false;
        req.session.username= undefined;
        req.session.id= undefined;
  }
utils.writeJson(res, undefined);
};

module.exports.loggedInUserGET = function loggedInUserGET (req, res, next) {
    if(req.session.loggedin){
      var userId = req.session.id;
      UserService.getUserById(userId)
        .then(function (response) {
          utils.writeJson(res, response);
        })
        .catch(function (response) {
          utils.writeJson(res, response);
        });
    }else{
      utils.writeJson(res, undefined);
    }
};

module.exports.userRegisterPOST = function userRegisterPOST(req, res, next) {
  var body = req.swagger.params["body"].value;
  UserService.userRegisterPOST(body)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};
module.exports.usersGET = function usersGET (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;

  UserService.usersGET(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserById = function getUserById (req, res, next) {
  var userId = req.swagger.params['userId'].value;

  UserService.getUserById(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};