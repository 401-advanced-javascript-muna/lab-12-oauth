
'use strict ';

const express = require('express');

const basicAuth =  require('../auth/basic-auth-middleware');

const users = require('../auth/user');

const oauth = require('../auth/oauth-middleware.js');

const bearerAuth = require('../auth/bearer-auth-middleware.js');

const app = express();

app.use(express.json());

app.use(express.static('./public'));


//**************Routes*******************

app.post('/signup', (req, res) => {
  new users(req.body).save()
    .then((user) => {
      console.log('user-------',user);
      let token = user.generateToken();
      res.status(200).send(token);
    }).catch(err => console.error(err));
});

app.post('/signin', basicAuth,bearerAuth, (req, res) => {
  res.status(200).send(req.token);
});

app.get('/oauth', oauth, (req, res) => {
  // console.log(req.query);
  res.status(200).send(req.token);
});

app.get('/users', basicAuth, (req, res) => {

  users.find()
    .then(records =>{
      res.status(200).send(records );
    });
});
app.get('/secret', bearerAuth, (req, res) => {
  console.log('req.user',req.user);
  res.status(200).json(req.user);
});





module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log('MY SERVER IS UP  :', PORT));
  },
};

