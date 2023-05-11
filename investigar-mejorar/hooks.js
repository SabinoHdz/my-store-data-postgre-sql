//Investigar la implementacion
//Pueden utlizar los hooks con sequelize para que realice el hash de la contraseña antes de guardar los datos. Solo tienes que agregar la opción hooks en el método config de la clase User que se encuentra en user.model.js

// static config(sequelize) {
//     return {
//       sequelize,
//       tableName: USER_TABLE,
//       modelName: 'User',
//       timestamps: false,
//       hooks: {
//         beforeCreate: async (user, options) => {
//           const password = await bcrypt.hash(user.password, 10);
//           user.password = password;
//         },
//       }
//     };
//   }
 //de esta forma puedes evitar realizar el hash en los servicios user y customer y dejarlos como estaban anteriormente.
