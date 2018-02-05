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

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../models/user.js')(sequelize, Sequelize);
db.events = require('../models/event.js')(sequelize, Sequelize);

//Relations
db.events.belongsTo(db.users);
db.users.hasMany(db.events);

module.exports = db;
