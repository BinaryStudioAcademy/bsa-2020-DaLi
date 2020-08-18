const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Users", deps: []
 * createTable "Dashboards", deps: []
 * createTable "Visualizations", deps: [Users]
 * createTable "DashboardVisualizations", deps: [Dashboards, Visualizations]
 *
 * */

const info = {
  revision: 1,
  name: 'initial',
  created: '2020-08-18T17:19:59.943Z',
  comment: '',
};

const migrationCommands = function (transaction) {
  return [
    {
      fn: 'createTable',
      params: [
        'Users',
        {
          id: {
            type: Sequelize.UUID,
            field: 'id',
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            autoIncrement: false,
            allowNull: false,
          },
          firstName: {
            type: Sequelize.STRING,
            field: 'firstName',
            allowNull: false,
          },
          lastName: {
            type: Sequelize.STRING,
            field: 'lastName',
            allowNull: false,
          },
          email: {
            type: Sequelize.STRING,
            field: 'email',
            unique: true,
            allowNull: false,
          },
          password: {
            type: Sequelize.STRING,
            field: 'password',
            defaultValue: 'P@$$w0rd',
            allowNull: true,
          },
          lastLogin: {
            type: Sequelize.DATE,
            field: 'lastLogin',
            allowNull: true,
          },
          createdAt: {
            type: Sequelize.DATE,
            field: 'createdAt',
          },
          updatedAt: {
            type: Sequelize.DATE,
            field: 'updatedAt',
          },
        },
        {
          transaction,
        },
      ],
    },
    {
      fn: 'createTable',
      params: [
        'Dashboards',
        {
          id: {
            type: Sequelize.UUID,
            field: 'id',
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            autoIncrement: false,
            allowNull: false,
          },
          name: {
            type: Sequelize.STRING,
            field: 'name',
            allowNull: false,
          },
          description: {
            type: Sequelize.STRING,
            field: 'description',
            allowNull: true,
          },
          config: {
            type: Sequelize.JSON,
            field: 'config',
            allowNull: true,
          },
          createdAt: {
            type: Sequelize.DATE,
            field: 'createdAt',
          },
          updatedAt: {
            type: Sequelize.DATE,
            field: 'updatedAt',
          },
        },
        {
          transaction,
        },
      ],
    },
    {
      fn: 'createTable',
      params: [
        'Visualizations',
        {
          id: {
            type: Sequelize.UUID,
            field: 'id',
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            autoIncrement: false,
          },
          type: {
            type: Sequelize.ENUM('LINE_CHART', 'BAR_CHART', 'TABLE'),
            field: 'type',
            allowNull: false,
          },
          name: {
            type: Sequelize.STRING,
            field: 'name',
            allowNull: false,
          },
          description: {
            type: Sequelize.STRING,
            field: 'description',
            allowNull: true,
          },
          config: {
            type: Sequelize.JSON,
            field: 'config',
            allowNull: false,
          },
          createdAt: {
            type: Sequelize.DATE,
            field: 'createdAt',
          },
          updatedAt: {
            type: Sequelize.DATE,
            field: 'updatedAt',
          },
          UserId: {
            type: Sequelize.UUID,
            field: 'UserId',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            references: {
              model: 'Users',
              key: 'id',
            },
            allowNull: true,
          },
        },
        {
          transaction,
        },
      ],
    },
    {
      fn: 'createTable',
      params: [
        'DashboardVisualizations',
        {
          id: {
            type: Sequelize.UUID,
            field: 'id',
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            autoIncrement: false,
            allowNull: false,
          },
          createdAt: {
            type: Sequelize.DATE,
            field: 'createdAt',
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            field: 'updatedAt',
            allowNull: false,
          },
          dashboards_id: {
            type: Sequelize.UUID,
            allowNull: true,
            field: 'dashboards_id',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            references: {
              model: 'Dashboards',
              key: 'id',
            },
            unique: 'DashboardVisualizations_dashboards_id_visualizations_id_unique',
          },
          visualizations_id: {
            type: Sequelize.UUID,
            allowNull: true,
            field: 'visualizations_id',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            references: {
              model: 'Visualizations',
              key: 'id',
            },
            unique: 'DashboardVisualizations_dashboards_id_visualizations_id_unique',
          },
        },
        {
          transaction,
        },
      ],
    },
  ];
};
const rollbackCommands = function (transaction) {
  return [
    {
      fn: 'dropTable',
      params: [
        'Users',
        {
          transaction,
        },
      ],
    },
    {
      fn: 'dropTable',
      params: [
        'Visualizations',
        {
          transaction,
        },
      ],
    },
    {
      fn: 'dropTable',
      params: [
        'Dashboards',
        {
          transaction,
        },
      ],
    },
    {
      fn: 'dropTable',
      params: [
        'DashboardVisualizations',
        {
          transaction,
        },
      ],
    },
  ];
};

module.exports = {
  pos: 0,
  useTransaction: true,
  execute(queryInterface, Sequelize, _commands) {
    let index = this.pos;
    function run(transaction) {
      const commands = _commands(transaction);
      return new Promise((resolve, reject) => {
        function next() {
          if (index < commands.length) {
            const command = commands[index];
            console.log(`[#${index}] execute: ${command.fn}`);
            index++;
            queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
          } else {
            resolve();
          }
        }
        next();
      });
    }
    if (this.useTransaction) {
      return queryInterface.sequelize.transaction(run);
    }
    return run(null);
  },
  up(queryInterface, Sequelize) {
    return this.execute(queryInterface, Sequelize, migrationCommands);
  },
  down(queryInterface, Sequelize) {
    return this.execute(queryInterface, Sequelize, rollbackCommands);
  },
  info,
};
