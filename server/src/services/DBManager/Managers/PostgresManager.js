import Sequelize from 'sequelize';

export default class DBPostgresManager {
  constructor(databaseURL) {
    this.sequelize = new Sequelize(databaseURL, {
      dialect: 'postgres',
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

  getTableSchemaByTablename(tablename) {
    this.sequelize
      .query(
        `
      SELECT 
        table_name,
        data_type 
      FROM 
        information_schema.columns
      WHERE 
        table_name = '${tablename}';`
      )
      .then((data) => {
        console.log(data[0]);
      });
  }
}
