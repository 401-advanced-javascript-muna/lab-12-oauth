/* eslint-disable camelcase */
'use strict ';
require('dotenv').config();
const superagent = require('superagent');
const users = require('./user.js');
const jwt = require('jsonwebtoken');


const tokenServerUrl = 'https://github.com/login/oauth/access_token';
const remoteAPI = 'https://api.github.com/user';

// from demo code
/**
 * oauth Middleware (github)
 */


module.exports = async function oauth(req, res, next) {
  try {
    let code = req.query.code;
    // console.log('req.body' , req.body)
    let getTokenFromGitHub = await tokenFromGitHub(code);
    let userInfo = await getRemoteUserInfo(getTokenFromGitHub);
    let [user, token] = await userAndToken(userInfo);
    req.user = user;
    req.token = token;
    console.log('code:', code);
    console.log('getTokenFromGitHub:', getTokenFromGitHub);
    console.log('userInfo:', userInfo);
    console.log('user', user);
    next();
  } catch(err) {
    next(err);
  }
};
async function tokenFromGitHub(code) {
  let tokenResponse = await superagent.post(tokenServerUrl).send({
    code: code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri:process.env.API_SERVER,
    grant_type: 'authorization_code',
  });
  let access_token = tokenResponse.body.access_token;
  return access_token;
}
async function getRemoteUserInfo(token) {
  let userResponse = await superagent.get(remoteAPI)
    .set('user-agent', 'express-app')
    .set('Authorization', `token ${token}`);
  let user = userResponse.body;
  return user;
}
async function userAndToken(userInfo) {
  let userRecord = {
    username: userInfo.login,
    password: 'oauthpassword',
  };
  let user = new users(userRecord).save;
  // let token = generateToken(user);
  let token = jwt.sign({ id: user._id  }, process.env.SECRET);

  console.log('/////////0000/',user,'2222222222222222222222222222222',token);
  return [user, token];
}