/* eslint-disable no-empty-function */
/* eslint-disable no-undef */
// eslint-disable-next-line strict
'use strict';

const schema = require('./products-schema.js');

const Model = require('./model');

/**
 * Products class extends to Model
 */
class Products extends Model{}


module.exports = new Products(schema);