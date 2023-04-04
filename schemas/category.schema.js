const Joi = require('joi');

const id = Joi.string().uuid();
const title = Joi.string();
const description = Joi.string();
const createCategorySchema = Joi.object({
  title: title.required(),
  description: description.required(),
});

const updateCategorySchema = Joi.object({
  title: title,
  description: description
});

const getCategorySchema = Joi.object({
  id: id.required(),
});

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema }
