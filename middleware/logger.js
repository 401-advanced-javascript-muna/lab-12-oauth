'use strict ';

/**
 * Middleware function to add time and date
 */
module.exports = function timestamp() {//stackoverflow
  return (req, res, next) => {
    const date = new Date().toLocaleDateString('en-US');
    const time = new Date().toLocaleTimeString('en-US');
    req.requestTime = 'THE DATE IS' + date + '  THE TIME NOW IS  ' + time;
    // console.log('reqdddddddd : ', req.requestTime);
    next();
  };
};

/**
 * Logger Middleware
 */
module.exports = (req , res , next ) => {
  console.log(' request Information => ',req.method, req.path);
  next();
};