import Sequelize from 'sequelize';

export default class DBPostgresManager {
  constructor(databaseURL) {
    this.sequelize = new Sequelize(databaseURL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
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

  getTableDataByName(name) {
    return this.sequelize
      .query(
        `
        SELECT *
        FROM "${name}"
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
        return data[0];
      });
  }
}
