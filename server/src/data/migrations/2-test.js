const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "password" on table "Users"
 *
 * */

const info = {
  revision: 2,
  name: 'test',
  created: '2020-08-18T17:28:08.531Z',
  comment: '',
};

const migrationCommands = function (transaction) {
  return [
    {
      fn: 'changeColumn',
      params: [
        'Users',
        'password',
        {
          type: Sequelize.STRING,
          field: 'password',
          defaultValue: 'P@$$w0rd222',
          allowNull: true,
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
      fn: 'changeColumn',
      params: [
        'Users',
        'password',
        {
          type: Sequelize.STRING,
          field: 'password',
          defaultValue: 'P@$$w0rd',
          allowNull: true,
        },
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
