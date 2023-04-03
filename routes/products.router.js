const ProductsService = require('../services/product.service');
const {validatorHandler} = require('./../middlewares/validator.handler.js');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('../schemas/product.schema');

const express = require('express');
const router = express.Router();
const service = new ProductsService();
//product static
router.get('/filter', (req, res) => {
  res.send('soy un filtro');
});
//products dinamic
router.get('/', async (req, res, next) => {
  try {
    const products = await service.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

//product by id
router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
      // res.status(404).json({
      //   message:error.message
      // });
    }
  }
);
router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
     next(error);
      // res.status(404).json({
      //   message:error.message
      // });
    }
  }
);
router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const { id } = req.params;
      const updProduct = await service.update(id, body);
      res.json(updProduct);
    } catch (error) {
      next(error);
    }
  }
);
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const delProduct = await service.delete(id);
    res.json(delProduct);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
