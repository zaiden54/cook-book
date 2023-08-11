require('dotenv').config();

module.exports = {
  development: {
    use_env_variable: 'DB_URL',
    seederStorage: 'sequelize',
    seederStorageTableName: 'SequelizeData',
    logging: false,
  },
  test: {
    use_env_variable: 'DB_URL',
  },
  production: {
    use_env_variable: 'DB_URL',
  },
};
