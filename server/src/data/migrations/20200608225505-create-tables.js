/* eslint-disable prettier/prettier */
export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS pgcrypto;')
      // .then(() => queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'))
      .then(() =>
        queryInterface.sequelize.transaction((transaction) =>
          Promise.all([
            queryInterface.createTable(
              'users',
              {
                id: {
                  allowNull: false,
                  autoIncrement: false,
                  primaryKey: true,
                  type: Sequelize.UUID,
                  defaultValue: Sequelize.literal('gen_random_uuid()'),
                },
                email: {
                  allowNull: false,
                  type: Sequelize.STRING,
                  unique: true,
                },
                firstName: {
                  allowNull: false,
                  type: Sequelize.STRING,
                  unique: true,
                },
                lastName: {
                  allowNull: false,
                  type: Sequelize.STRING,
                  unique: true,
                },
                password: {
                  allowNull: false,
                  type: Sequelize.STRING,
                },
                createdAt: Sequelize.DATE,
                updatedAt: Sequelize.DATE,
              },
              {
                transaction,
              }
            ),
          ])
        )
      ),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction((transaction) =>
      Promise.all([
        queryInterface.dropTable('users', {
          transaction,
        }),
      ])
    ),
};
