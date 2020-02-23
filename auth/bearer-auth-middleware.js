'use stricts ';

const users = require('./user.js');
/**
 * Bearer Auth Middleware
 */

module.exports = (req, res, next) => {
  let token;
  console.log(req.headers.authorization,'req.header.authorization');
  console.log('req.token : ', req.token);
  if (!req.headers.authorization) { next('invalid login'); }

  // when signin
  if(req.token){ token = req.token;
    console.log('token mmm');}

  else{
    token = req.headers.authorization.split(' ').pop();
  }
  console.log('token : ', token);

  // if (!req.headers.authorization) { next('invalid login'); }

  // let token = req.headers.authorization.split(' ').pop();

  users.bearerAuthenticateToken(token)
    .then(validUser => {
      console.log('validUser : ', validUser);
      req.user = validUser;
      next();
    }).catch(err => next(err));

};