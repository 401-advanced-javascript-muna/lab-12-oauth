
'use strict ';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');


// const basicAuth =  require('../auth/basic-auth-middleware');

// const users = require('../auth/user');

// const oauth = require('../auth/oauth-middleware.js');

// const bearerAuth = require('../auth/bearer-auth-middleware.js');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use(express.static('./public'));

const router = require('./routes.js');

const loqRequest = require('../middleware/logger.js');

const error404 = require('../middleware/err404.js');

const error500 = require('../middleware/err500.js');

const categoriesRoutes = require('../api-route/categories-routes.js');

const ProductRoutes = require('../api-route/products-routes.js');

/**
 * middleware
 */
app.use(loqRequest);

// routes for api
app.use('/api/v1', categoriesRoutes);
app.use('/api/v1' , ProductRoutes);
app.use(router);


/**
 * error handler
 */
app.use(error404);
app.use(error500);



module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log('MY SERVER IS UP  :', PORT));
  },
};

