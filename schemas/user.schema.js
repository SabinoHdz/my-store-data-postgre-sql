const Joi = require('joi');

const id = Joi.string();
const name = Joi.string().min(10).max(50);
const user=Joi.string().min(5).max(20);
const email=Joi.string().email();
const password=Joi.string().min(8).max(20);
const createUserSchema = Joi.object({
  name: name.required(),
  user: user.required(),
  email:email.required(),
  password:password.required()
});

const updateUserSchema = Joi.object({
  name: name,
  user: user,
  email:email,
  password:password
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }
