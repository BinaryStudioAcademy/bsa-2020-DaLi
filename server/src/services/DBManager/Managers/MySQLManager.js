import Sequelize from 'sequelize';
import schemaNormalizer from '../helpers/postgresDataTypeNormalizer';

export default class DBMySQLManager {
  constructor(databaseURL) {
    const dialectOptions = {};
    if (!databaseURL.includes('localhost')) {
      dialectOptions.ssl = {
        require: true,
        rejectUnauthorized: false,
      };
    }

    this.sequelize = new Sequelize(databaseURL, {
      dialect: 'mysql',
      dialectOptions,
    });
  }

  init() {
    return this.sequelize.authenticate();
  }

  destroy() {
    return this.sequelize.close();
  }

  getTablenames(dbName) {
    return this.sequelize.query('show tables').then((res) => {
      const tables = res[0];
      return tables.map((i) => i[`Tables_in_${dbName}`]);
    });
  }

  getTableDataByName(name) {
    return this.sequelize.query(`SELECT * FROM ${name}`).then((data) => {
      return data[0];
    });
  }

  getTableSchemaByName(name) {
    return this.sequelize
      .query(
        `
        SELECT COLUMN_NAME, DATA_TYPE
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = '${name}';
        `
      )
      .then((data) => {
        const schemaCols = data[0];
        return schemaCols.map((col) => {
          return { column_name: col.COLUMN_NAME, data_type: schemaNormalizer(col.DATA_TYPE) };
        });
      });
  }
}
