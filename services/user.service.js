const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
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
    return this.users;
  }
  async findOne(id) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }
  async create(data) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }
  async update(id, changes) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('user not found');
    }
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes,
    };
    return this.users[index];
  }
  async delete(id) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('user not found');
    }
    this.users.splice(index, 1);
    return { id };
  }
}

module.exports = UsersService;
