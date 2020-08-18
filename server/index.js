import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express';
import { sequelize } from './src/models';
import routes from './src/routes';
import errorHandlerMiddleware from './src/middlewares/errorHandlerMiddleware';
import { passportMiddleware } from './src/middlewares/passport';

import * as swaggerDocument from './src/docs';
import DBManager from './src/services/DBManager/DBManagerService';

const app = express();

app.use(passport.initialize());
passportMiddleware(passport);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

routes(app);

app.use(errorHandlerMiddleware);

sequelize.sync();

sequelize
  .authenticate()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', err);
  })
  .finally(() => {
    // eslint-disable-next-line no-unused-vars
    const manager = new DBManager('283f0a3e-6c88-4df2-9273-af326743b8fa');
    manager.create().then((manager) => {
      manager
        .init()
        .then(() => {
          console.log();
          console.log('External DB connection has been established successfully.');
          console.log();
          manager.getTablenames();
          manager.getTableSchemaByTablename('Visualizations');
        })
        .catch((err) => {
          console.log();
          console.error('Unable to connect to the external database:', err);
          console.log();
        });
    });
  });

app.listen(process.env.PORT, () => {
  console.log(`App is listening on port ${process.env.PORT}!`);
});
