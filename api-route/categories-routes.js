

const express = require('express');

const Categories = require('../model/categories.js');
const router = express.Router();
const accessControlList = require('../auth/acl-middleware.js');
const basicAuth = require('../auth/basic-auth-middleware.js');


/**
 * All API Routes With Access control list
 */
router.get('/categories', getCategories);
router.get('/categories/:_id', getByIdCategories);
router.post('/categories', basicAuth , accessControlList('create') , postCategories);
router.put('/categories/:_id', basicAuth ,accessControlList('update'), UpdateCategories);
router.delete('/categories/:_id',basicAuth , accessControlList('delete'), deleteCategories);


/**
 *
 * @param {object} req
 * @param {object} res
 * @param {funcrion} next
 */
let category  = new Categories;
function getCategories(req, res, next) {
  category.get()
    .then(data => {
      const output = {
        count: data.length,
        results: data,
      };
      res.status(200).json(output);
    })
    .catch(next);
}
/**
   *
   * @param {object} req
   * @param {object} res
   * @param {function} next
   */
function getByIdCategories(req, res, next) {
  category.get(req.params._id)
    .then(result => res.status(200).json(result))
    .catch(next);
}

/**
   *
   * @param {object} req
   * @param {object} res
   * @param {function} next
   */
function postCategories(req, res, next) {
  category.create(req.body)
    .then(result => res.status(201).json(result))
    .catch(next);
}

/**
   *
   * @param {object} req
   * @param {object} res
   * @param {function} next
   */
function UpdateCategories(req, res, next) {
  category.update(req.params._id, req.body)
    .then(result => res.status(200).json(result))
    .catch(next);
}


/**
   *
   * @param {object} req
   * @param {object} res
   * @param {function} next
   */
function deleteCategories(req, res, next) {
  category.delete(req.params._id)
    .then(result => res.status(200).json(result))
    .catch(next);
}

module.exports = router;