import Sequelize from 'sequelize';

export default class DBPostgresManager {
  constructor(databaseURL) {
    this.sequelize = new Sequelize(databaseURL, {
      dialect: 'postgres',
    });
  }

  init() {
    this.sequelize.sync();
    return this.sequelize.authenticate();
  }

  getTablenames() {
    this.sequelize
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
        console.log(rows);
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
