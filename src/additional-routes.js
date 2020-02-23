'use strict ';
const express = require('express');
const aclRouter = express.Router();
const bearerAuth = require('../auth/bearer-auth-middleware.js');
const basicAuth = require('../auth/basic-auth-middleware.js');
const acl = require('../auth/acl.middleware.js');
const Role = require('../auth/roles-schema.js');

const capabilities = {
  admin: ['create','read','update','delete'],
  editor: ['create', 'read', 'update'],
  user: ['read'],
};


aclRouter.post('/roles', (req, res, next) => {
  let saved = [];
  Object.keys(capabilities).map(role => {
    let newRecord = new Role({type: role, capabilities: capabilities[role]});
    saved.push(newRecord.save());
  });
  Promise.all(saved);
  res.send('Roles Created');
});


// router.get('/public') should be visible by anyone
aclRouter.get('/public',(req,res)=>{
  res.status(200).send('OK!!!!');

});

// router.get('/private') should require only a valid login
aclRouter.get('/private',basicAuth,(req,res)=>{
  res.status(200).send('OK!!!!');

});
// router.get('/readonly') should require the read capability
aclRouter.get('/readonly',bearerAuth,acl('read'),(req,res)=>{
  res.status(200).send('OK!!!!');

});
// router.get('/create) should require the create capability
aclRouter.get('/create',bearerAuth,acl('create'),(req,res)=>{
  res.status(200).send('OK!!!!');

});

// router.put('/update) should require the update capability
aclRouter.get('/update',bearerAuth,acl('update'),(req,res)=>{
  res.status(200).send('OK!!!!');

});
// router.patch('/delete) should require the update capability
aclRouter.get('/delete',bearerAuth,acl('delete'),(req,res)=>{
  res.status(200).send('OK!!!!');

});
// router.get('/everything') should require the superuser capability
aclRouter.get('/everything',bearerAuth,acl('delete'),(req,res)=>{
  res.status(200).send('OK!!!!');

});

module.exports = aclRouter;
