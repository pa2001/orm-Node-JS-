const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('demo', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
  port: 1024,
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
}

testConnection();
