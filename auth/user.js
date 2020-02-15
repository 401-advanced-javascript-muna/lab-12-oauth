/* eslint-disable no-unused-vars */

'use strict';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

require('dotenv').config();

// let SECRET = "secret123" ;

//  our schema 
const users = new mongoose.Schema({
    username: { type: String, required: true ,unique: true},
    password: { type: String, required: true },
    role: {type: String, default:'user', enum: ['admin','editor','user']},
  
  });

  const capabilities = {
    admin: ['create','read','update','delete'],
    editor: ['create', 'read', 'update'],
    user: ['read'],
  };


//   Hash the plain text password given before you save a user to the database
users.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 5);
    console.log('ffffffffffff',this.password)
  });


  //   Method to authenticate a user using the hashed password
  users.statics.authenticateBasic = async function(user , password){  
    let foundUser = await this.find({username: user});
    console.log('foundyserfoundUserfoundUser',foundUser) ;
    if (foundUser) {
    let valid = bcrypt.compare(password, foundUser[0].password);  ////sign in 
    return valid ? foundUser[0].username : Promise.reject();
    }else {
        Promise.reject();
    }
  }
  

//   Method to generate a Token following a valid login
  users.methods.generateToken = function(user) {
    let userData = {
      id: this._id,
      capabilities: roles[user.role]
    }
    let token = jwt.sign(userData, process.env.SECRET);

    // let token = jwt.sign({ id: this._id  }, process.env.SECRET);
    // let token = jwt.sign({ username: user.username}, SECRET);
    return token;
  }

  users.statics.bearerAuthenticateToken = async function(token) {
    try {

      let tokenObject = await jwt.verify(token, process.env.SECRET);
      console.log('token ',token)
      console.log('tokenObjecttokenObject :- ',tokenObject );
      // let idToken = {id: tokenObject._id };
      // console.log('idTokenidTokenidToken',idToken)
      return this.findOne({id:tokenObject._id});

      
    } catch (err) {
      return Promise.reject();
    }
  }

  module.exports = mongoose.model('users', users);

// from demo code



