const express = require('express');
const router = express.Router();
const { validatorHandler } = require('./../middlewares/validator.handler.js');
const {
  createOrderSchema,
  getOrderSchema,
  addItemSchema,
} = require('../schemas/order.schema.js');
const OrdersService = require('./../services/order.service');
const service = new OrdersService();
router.get('/', async (req, res, next) => {
  try {
    const orders = await service.find();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});
router.get(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      res.json(newItem);
    } catch (error) {
      next(error);
    }
  }
);
router.patch(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.id;
      const body = req.body;
      const updateOrder = await service.update(id, body);
      res.json(updateOrder);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  (req, res, next) => {
    try {
      const { id } = req.id;
      const delOrder = service.delete(id);
      res.json(delOrder);
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;
