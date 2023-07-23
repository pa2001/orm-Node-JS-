// Import Sequelize and the database connection from your setup
const { Sequelize, sequelize } = require('../config/sequelize');
const User = require('./User_info');

// Define the Task model
const Task = sequelize.define('task_infos', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  priority: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  due_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  created_by: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
});

// Define the association with the User model
Task.belongsTo(User, { foreignKey: 'created_by' });

// Create the table if it doesn't exist
Task.sync();

// Export the Task model
module.exports = Task;
