const CategoriesService = require('../services/category.service');
const {validatorHandler} = require('./../middlewares/validator.handler.js');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('../schemas/category.schema');

const express = require('express');
const router = express.Router();
const service = new CategoriesService();
router.get('/', async (req, res, next) => {
  try {
    const categories = await service.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

//product by id
router.get(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
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
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const { id } = req.params;
      const updateCategory= await service.update(id, body);
      res.json(updateCategory);
    } catch (error) {
      next(error);
    }
  }
);
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const delCategory = await service.delete(id);
    res.json(delCategory);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
