'use strict';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

require('dotenv').config();

// let SECRET = "secret123" ;

//  our schema 
const users = new mongoose.Schema({
    username: { type: String, required: true ,unique: true},
    password: { type: String, required: true }
  
  });

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
    let token = jwt.sign({ id: this._id  }, process.env.SECRET);
    // let token = jwt.sign({ username: user.username}, SECRET);
    return token;
  }

  users.statics.bearerAuthenticateToken = async function(token) {
    try {

      let tokenObject = jwt.verify(token, process.env.SECRET);
      console.log('tokenObject : ',tokenObject );

      
      let token = jwt.sign({ username: user.username}, process.env.SECRET, { expiresIn: 60 * 15});
      
      // return users.findOne({username:tokenObject.username});
      //   console.log('hiiiii')
      //   let tokenObject = jwt.verify(token, process.env.SECRET);
      // console.log('tokenObject',tokenObject)
      console.log(users,'user')
      if (users.tokenObject.username) {
        console.log(tokenObject,'tokenObject');
        return users.findOne({username:tokenObject.username});
      } else {
        return Promise.reject();
      }
    } catch (err) {
      return Promise.reject();
    }
  }

  module.exports = mongoose.model('users', users);

// from demo code



