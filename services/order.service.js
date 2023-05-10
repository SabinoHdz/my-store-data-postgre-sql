const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
class OrdersService {
  constructor() {}
  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }
  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }
  async find() {
    // const orders = await models.Order.findAll({
    //   include:['customer ']
    // });
     const orders = await models.Order.findAll({
      include:[{
        association:'customer',
        include:['user']
      }]
    });
    return orders;
  }
  async findOne(id) {
    const order = await models.Order.findByPk(id);
    if (!order) {
      throw boom.notFound('order not found ');
    }
    return order;
  }
  async update(id, changes) {
    const order = await this.findOne(id);
    const updateOrder = await order.update(changes);
    return updateOrder;
  }
  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();
    return { id };
  }
}
module.exports = OrdersService;
