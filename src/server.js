'use strict';


const express = require('express');

const basicAuth =  require('../auth/basic-auth-middleware');

const users = require('../auth/user');

const oauth = require('../auth/oauth-middleware');

const app = express();

app.use(express.json());

app.use(express.static('./public'));


//**************Routes*******************

app.post('/signup', (req, res) => {
  new users(req.body).save()
  //   console.log(req.body,'req.bodyreq.bodyreq.bodyreq')
  //  console.log('req.body 2' , req.body)
    .then((user) => {

      console.log('user-------',user);
      let token = user.generateToken();
      res.status(200).send(token);
    }).catch(err => console.error(err));
});

app.post('/signin', basicAuth, (req, res) => {
  res.status(200).send(req.token);
});

app.get('/oauth', oauth, (req, res) => {
  console.log(req.query)
    res.status(200).send(req.token);
  });

app.get('/users', basicAuth, (req, res) => {

  users.find()
    .then(records =>{
      res.status(200).send(records );
    });
 
});

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log('MY SERVER IS UP  :', PORT));
  },
};

