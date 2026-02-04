const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database.sqlite'),
    logging: false
});

const User = require('./User')(sequelize, DataTypes);
const Material = require('./Material')(sequelize, DataTypes);

module.exports = {
    sequelize,
    User,
    Material
};
