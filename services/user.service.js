const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const {models}=require('./../libs/sequelize');
class UsersService {
  constructor() {
    this.users = [];
    this.generate();
  }
  generate() {
    const limit = 10;
    for (let i = 0; i < limit; i++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.fullName(),
        user: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.internet.avatar(),
        password: faker.internet.password(),
        birthdate: faker.date.birthdate(),
      });
    }
  }
  async find() {
    const users=await models.User.findAll();

    return users;
  }
  async findOne(id) {
    const user =await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }
  async create(data) {
   const newUser=await models.User.create(data);
    return newUser;
  }
  async update(id, changes) {
    const user=await this.findOne(id);
    const updUser=await user.update(changes);
    return updUser;
  }
  async delete(id) {
    const user=await this.findOne(id);
    await user.destroy();

    return { id };
  }
}

module.exports = UsersService;
