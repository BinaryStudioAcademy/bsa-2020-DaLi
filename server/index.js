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

const app = express();
app.use(
  cors({
    origin: '*',
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  })
);
app.use(passport.initialize());
passportMiddleware(passport);

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
  });

app.listen(process.env.PORT, () => console.log(`App is listening on port ${process.env.PORT}!`));
