/* eslint-disable class-methods-use-this */
import Sequelize from 'sequelize';
import schemaNormalizer from '../helpers/postgresDataTypeNormalizer';

export default class DBPostgresManager {
  constructor(databaseURL) {
    const dialectOptions = {};
    if (!databaseURL.includes('localhost')) {
      dialectOptions.ssl = {
        require: true,
        rejectUnauthorized: false,
      };
    }
    this.sequelize = new Sequelize(databaseURL, {
      dialect: 'postgres',
      dialectOptions,
    });
  }

  init() {
    return this.sequelize.authenticate();
  }

  destroy() {
    return this.sequelize.close();
  }

  getTablenames() {
    return this.sequelize
      .query(
        `
      SELECT 
        tablename 
      FROM 
        pg_catalog.pg_tables 
      WHERE 
        schemaname='public'
      `
      )
      .then((rowsVariations) => {
        const rowObjects = rowsVariations[0];
        const rows = rowObjects.map((o) => o.tablename);
        return rows;
      });
  }

  formQueryFromSettings(settings) {
    let query = settings.length ? ' WHERE ' : '';
    let isFirstOption = true;
    settings.forEach((setting) => {
      const { columnName, columnType } = setting;
      if (columnType === 'date') {
        const greaterThan = setting.greaterThan ? new Date(setting.greaterThan).toISOString() : '-infinity';
        const lessThan = setting.lessThan ? new Date(setting.lessThan).toISOString() : 'infinity';
        if (greaterThan) {
          query += ` ${isFirstOption ? '' : 'AND'} "${columnName}" >= '${greaterThan}' `;
          isFirstOption = false;
        }
        if (lessThan) {
          query += ` ${isFirstOption ? '' : 'AND'} "${columnName}" <= '${lessThan}' `;
          isFirstOption = false;
        }
      }
    });
    return query;
  }

  getTableDataByName(name, settings) {
    settings = settings.map((s) => JSON.parse(s));
    const filterQuery = this.formQueryFromSettings(settings);
    return this.sequelize
      .query(
        `
        SELECT *
        FROM "${name}"
        ${filterQuery}
        `
      )
      .then((data) => {
        return data[0];
      });
  }

  getTableSchemaByName(name) {
    return this.sequelize
      .query(
        `
      SELECT 
        data_type,
        column_name 
      FROM 
        information_schema.columns
      WHERE 
        table_name = '${name}';`
      )
      .then((data) => {
        const schema = data[0];
        schema.forEach((item) => {
          item.data_type = schemaNormalizer(item.data_type);
        });
        return schema;
      });
  }
}
