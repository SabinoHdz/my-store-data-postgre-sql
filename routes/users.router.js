const express = require('express');
const UsersService = require('../services/user.service');
const { validatorHandler } = require('./../middlewares/validator.handler');
const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} = require('../schemas/user.schema');
const router = express.Router();
const service = new UsersService();
router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});
router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = service.create(body);
      res.json(newUser);
    } catch (error) {
      next(error);
    }
  }
);
router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updateUser = service.update(id, body);
      res.json(updateUser);
    } catch (error) {
      next(error);
    }
  }
);
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const delUser = service.delete(id);
    res.json(delUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
