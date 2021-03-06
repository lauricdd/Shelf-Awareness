'use strict';

// DB configuration
var knex = require('../knex/knex');


/**
 * Login
 * Login with a form
 *
 * username String
 * password String
 * no response value expected for this operation
 **/
exports.userLoginPOST = function(username, password) {
  return knex('users')
    .select()
    .where('users.email', '=', username)
    .andWhere('users.password', '=', password)
    .then((user) => {
      return formatUser(user);
    })
    .catch((err) => console.log(err));
};


/**
 * Register
 * Register into the store
 *
 * body User
 * no response value expected for this operation
 **/
exports.userRegisterPOST = function(email, password, name, address, creditcard) {
  var registeredUser;
  knex('users')
    .first()
    .where('users.email', email)
    .then((user) => {
      registeredUser = user;
    })
    .catch((err) => new Promise(function(resolve, reject) {
      reject(user);
    }));
  // console.log(registeredUser);
  if (registeredUser == undefined) {
    // console.log("usao u upis");
  return  knex('users').insert({
        name: "" + name + "",
        email: "" + email + "",
        password: "" + password + "",
        address: "" + address + "",
        creditcard: "" + creditcard + ""
      })
      .returning('id')
      .then(function(result) {
        var id = result[0];
        registeredUser = result;
        console.log("Result of insert a row in user: ");
        console.log(id);
        return format(registeredUser);
        // result.json({ success: true, message: 'ok' });     // respond back to request
      });
  }
  // return new Promise(function(resolve, reject) {
  //   resolve(registeredUser);
  // });
}

/**
 * Users available in the inventory
 * List of users available in the inventory
 *
 * offset Integer Pagination offset. Default is 0. (optional)
 * limit Integer Maximum number of items per page. Default is 20 and cannot exceed 500. (optional)
 * returns List of Users
 **/
exports.usersGET = function(offset, limit) {
  return knex('users')
    .select()
    .offset(offset)
    .limit(limit)
    .orderBy('id', 'asc')
    .then((user) => {
      return user.map(e => {
        return formatUser(e);
      });
    })
    .catch((err) => console.log(err));
};


/**
 * Find user by ID
 * Returns a user
 *
 * userId Long ID of user to return
 * returns User
 **/
exports.getUserById = function(userId) {
  return knex('users')
    .select()
    .where('users.id', userId)
    .then((user) => {
      console.log("\nDOBIO USERA " + user.name);
      return formatUser(user);
    })
    .catch((err) => console.log(err));
};

function formatUser(user) {
  delete user.password;

  return user;
}
