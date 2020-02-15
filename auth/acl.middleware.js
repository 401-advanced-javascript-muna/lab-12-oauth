'use strict ';

const users = require('./user');

module.exports = (capability) => {

    return (req, res, next) => {
  
      // We're expecting that previous middleware has put the user object on the request object
      // Given that, we can just inspect their capabilities.
      // Using a try/catch to avoid having to deeply check this object
      try {
        if (req.user.capabilities.includes(capability)) {
          next();
        }
        else {
          next('Access Denied');
        }
      } catch (e) {
        next('Invalid Login');
      }
  
    }
  
  }