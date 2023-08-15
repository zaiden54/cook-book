require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    use_env_variable: 'DB_URL',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    seederStorageTableName: 'SequelizeData',
    logging: false,
  },
  test: {
    use_env_variable: 'DB_URL',
  },
  production: {
    use_env_variable: 'DB_URL',
    logging: false,
  },
};
