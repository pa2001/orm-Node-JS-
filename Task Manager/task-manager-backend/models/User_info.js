// Import Sequelize and the database connection from your setup
const { Sequelize, sequelize } = require('../config/sequelize');

// Define the User model
const User = sequelize.define('user_info', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Create the table if it doesn't exist
User.sync();

// Export the User model
module.exports = User;
