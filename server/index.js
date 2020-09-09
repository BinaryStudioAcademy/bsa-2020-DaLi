import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express';
import { sequelize } from './src/models';
import routes from './src/routes';
import errorHandlerMiddleware from './src/middlewares/errorHandlerMiddleware';
import authorizationMiddleware from './src/middlewares/authorizationMiddleware';
import routesWhiteListConfig from './src/config/routesWhiteListConfig';
import * as swaggerDocument from './src/docs';
import './src/config/passportConfig';

const app = express();
app.use(
  cors({
    origin: '*',
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', authorizationMiddleware(routesWhiteListConfig));
routes(app);

app.use(errorHandlerMiddleware);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(process.env.PORT, () => {
  console.log(`App is listening on port ${process.env.PORT}!`);
});
