const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('./../libs/sequelize');

class CustomersService {
  async find() {
    //se utiliza la asociacion user
    const customers = await models.Customer.findAll({
      include: ['user'],
    });
    return customers;
  }
  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('customer not found');
    }
    return customer;
  }
  async create(data) {
    //forma de crear el usuario y el customer
    // const newUser=await models.User.create(data.user);
    // const newCustomer=await models.Customer.create({
    //   ...data,
    //   userId:newUser.id
    // });
    //crear el usuario con la asociacion
    const hash = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash
      }
    }
    const newCustomer = await models.Customer.create(newData, {
      include: ['user'],
    });
    delete newCustomer.dataValues.user.dataValues.password;
    return newCustomer;
  }
  async update(id, data) {
    const customer = await this.findOne(id);
    const updateCustomer = await customer.update(data);
    return updateCustomer;
  }
  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy(id);

    return {
      id,
    };
  }
}
module.exports = CustomersService;
