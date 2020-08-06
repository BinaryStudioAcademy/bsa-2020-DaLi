import "dotenv/config";
import cors from "cors";
import express from "express";
import "./src/config/passport.config";
import { sequelize } from "./src/models";
import routes from "./src/routes";
import errorHandlerMiddleware from "./src/middlewares/errorHandlerMiddleware";
import passport from 'passport';
import './src/config/passport.config';

const app = express();

app.use(cors());
app.use(passport.initialize({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

app.use(errorHandlerMiddleware);

sequelize.sync().then(async () => {
  app.listen(process.env.PORT, () => console.log(`App is listening on port ${process.env.PORT}!`));
});
