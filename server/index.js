import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import passport from 'passport';
import { sequelize } from './src/models';
import routes from './src/routes';
// import errorHandlerMiddleware from './src/middlewares/errorHandlerMiddleware';
import { passportMiddleware } from './src/middlewares/passport';

const app = express();

app.use(passport.initialize());
passportMiddleware(passport);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

// app.use(errorHandlerMiddleware);

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
