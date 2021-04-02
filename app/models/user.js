const Sequelize = require('sequelize');
const sequelize = require('../database');

class User extends Sequelize.Model {};

User.init({
    pseudo: Sequelize.TEXT,
    password: Sequelize.TEXT

}, {
    sequelize,
    tableName: "user"
});

module.exports = User;