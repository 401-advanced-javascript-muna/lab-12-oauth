/* eslint-disable no-empty-function */
/* eslint-disable no-undef */
// eslint-disable-next-line strict
'use strict';

const schema = require('./categories-schema.js');

const Model = require('./model');

/**
 * Categoties class extends to Model
 */
class Categories extends Model{}



module.exports = new Categories(schema);