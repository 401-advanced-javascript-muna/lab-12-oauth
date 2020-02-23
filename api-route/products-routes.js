

const express = require('express');

const Products = require('../model/products.js');

const router = express.Router();

const acl = require('../auth/acl-middleware.js');

const basicAuth = require('../auth/basic-auth-middleware.js');

/**
 * All API Routes With Access control list
 */
router.get('/products',getProducts);
router.get('/products/:_id', geByIdtProduct);
router.post('/products',basicAuth ,acl('create') , postProducts);
router.put('/products/:_id',basicAuth ,acl('update') , updateProducts);
router.delete('/products/:_id',basicAuth ,acl('delete') , deleteProducts);

let product = new Products;

/**
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
function getProducts(req, res, next) {
  product.get()
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
function geByIdtProduct(req, res, next) {
  product.get(req.params._id)
    .then(result => res.status(200).json(result[0]))
    .catch(next);
}
/**
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
function postProducts(req, res, next) {
  product.create(req.body)
    .then(result =>res.status(201).json(result))

    .catch(next);
}

/**
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
function updateProducts(req, res, next) {
  product.update(req.params._id, req.body)
    .then(result => res.status(200).json(result))
    .catch(next);
}

/**
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
function deleteProducts(req, res, next) {
  product.delete(req.params._id)
    .then(result => res.status(200).json(result))
    .catch(next);
}

module.exports = router ;