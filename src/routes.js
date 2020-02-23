/* eslint-disable no-unused-vars */


const express = require('express');
/*eslint new-cap: ["error", { "properties": false }]*/
const router = express.Router();
const basicAuth = require('../auth/basic-auth-middleware.js');
const users = require('../auth/user.js');
const oauth = require('../auth/oauth-middleware.js');
const bearerOuth = require('../auth/bearer-auth-middleware.js');

router.use(express.static('./public'));

router.post('/signup', signUp);
router.post('/signin', basicAuth,bearerOuth, signIn);
router.get('/user',basicAuth, getUsers);
router.get('/oauth',oauth , getoauth);
router.get('/secret', bearerOuth , getBearer);

/**
 * signUp
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
// eslint-disable-next-line no-unused-vars
function signUp  (req, res , next){
/*eslint new-cap: ["error", { "newIsCap": false }]*/

  new users(req.body).save()
    .then((user) => {
      let token = users.generateToken();
      res.status(200).send(token);
    }).catch(err => console.error(err));
}


/**
 * signIn
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
function signIn(req, res , next){
  res.status(200).send(req.token);

}

/**
 * getUsers
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
function getUsers(req , res , next){

  users.find()
    .then(records =>{
      res.status(200).send(records );
    });
}

/**
 * getoauth
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
function getoauth( req , res , next){
  res.status(200).send(req.token);
}
/**
 * getBearer
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
function getBearer(req ,res, next){
  res.status(200).json(req.user);
}




module.exports = router; /* eslint-disable no-undef */