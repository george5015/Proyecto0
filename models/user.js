var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');
var util = require('util');

const sequelize = new Sequelize('cloud', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 9,
    min: 0,
    idle: 10000
  }
});

sequelize.authenticate().then(() => {
  console.log("Success!");
}).catch((err) => {
  console.log(err);
});

var User = sequelize.define('users', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
});

User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

sequelize.sync().catch(error => console.log('This error occured', error));

module.exports = User;
