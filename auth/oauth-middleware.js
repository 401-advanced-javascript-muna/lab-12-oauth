'use strict';

const superagent = require('superagent');
const users = require('./users.js');

const tokenServerUrl = 'https://github.com/login/oauth/access_token';
const remoteAPI = 'https://api.github.com/user';
// const CLIENT_ID = '';
// const CLIENT_SECRET = '';
// const API_SERVER = '';      ps: in .env file

//https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/

module.exports = async function authorize(req, res, next) {
  try {
    let code = req.query.code; //client request code  from github-------->githuh
    console.log('my code:', code); //client <-----------github sends code

    let remoteToken = await exchangeCodeForToken(code); //client sends code----------->github 
    console.log('remote token:', remoteToken);           //client <-----------github sends githubtoken

    let remoteUser = await getRemoteUserInfo(remoteToken);//client sends github token ----------->github 
    console.log('remote user:', remoteUser);              //client <-----------github sends user info

    let [user, token] = await getUser(remoteUser);
    req.user = user;
    req.token = token;

    console.log('user', user);

    next();
  } catch(err) {
    next(err);
  }
}

async function exchangeCodeForToken(code) {
  let tokenResponse = await superagent.post(tokenServerUrl).send({
    code: code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.API_SERVER,
    grant_type: 'authorization_code'
  })

  let access_token = tokenResponse.body.access_token;
  return access_token;
}

async function getRemoteUserInfo(token) {
  let userResponse = await superagent.get(remoteAPI)
    .set('user-agent', 'express-app')
    .set('Authorization', `token ${token}`)

  let user = userResponse.body;
  return user;
}

async function getUser(remoteUser) {
  let userRecord = {
    username: remoteUser.login,
    password: 'oauthpassword'
  }

  let user = await users.save(userRecord);          // s
  let token = users.generateToken(user);

  return [user, token];
}