const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
class CategoriesService {
  constructor() {}

  async find() {

  }
  async findOne(id) {
    // const category = this.categories.find((item) => item.id === id);
    // if (!category) {
    //   throw boom.notFound('category not found');
    // }
    // return category;
  }
  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }
  async update(id, changes) {
    // const index = this.categories.findIndex((item) => item.id === id);
    // if (index === -1) {
    //   throw boom.notFound('category not found');
    // }
    // const category = this.categories[index];
    // this.categories[index] = {
    //   ...category,
    //   ...changes,
    // };
    // return this.categories[index];
  }
  async delete(id) {
    // const index = this.categories.findIndex((item) => item.id === id);
    // if (index === -1) {
    //   throw boom.notFound('category not found');
    // }
    // this.categories.splice(index, 1);
    // return { id };
  }
}

module.exports = CategoriesService;
