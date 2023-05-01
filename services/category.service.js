const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
class CategoriesService {
  constructor() {}

  async find() {
    const categories = await models.Category.findAll();
    return categories;
  }
  async findOne(id) {
    const category = await models.Category.findByPk(id,{include:['products']});
    if (!category) {
      throw boom.notFound('user not found');
    }
    return category;
  }
  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }
  async update(id, changes) {
    const category = await this.findOne(id);
    const updateCategory = await category.update(changes);
    return updateCategory;
  }
  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy(id);
    return { id };
  }
}

module.exports = CategoriesService;
