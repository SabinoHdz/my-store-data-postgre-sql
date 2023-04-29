const boom=require('@hapi/boom');
const {models}=require('./../libs/sequelize');

class CustomersService{
  async find(){

    const customers=await models.Customer.findAll();
    return customers;
  }
  async findOne(id){
    const customer=await models.Customer.findByPk(id);
    if(!customer){
      throw boom.notFound('customer not found');
    }
    return customer;

  }
  async create(data){
    const newCustomer=await models.Customer.create(data);
    return newCustomer;

  }
  async update(id,data){
  const customer=await this.findOne(id);
  const updateCustomer=await customer.update(data);
  return updateCustomer;

  }
  async delete(id){
    const customer=await this.findOne(id);
    await customer.destroy(id);

    return {
      id
    };
  }
}
module.exports=CustomersService;
