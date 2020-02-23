'use strict ';


/**
 * Error Middleware Function
 */

module.exports = (req,res) => {
  res.status(404);
  res.statusMessage = ' Not Found Error (404)';
  res.json({error:'Not Found (404)'});
};