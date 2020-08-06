import "dotenv/config";
import cors from "cors";
import express from "express";
import "./src/config/passport.config";

import { sequelize } from "./src/models";
import routes from "./src/routes";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes.home);
app.use("/api/auth", routes.auth);

sequelize.sync().then(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`App is listening on port ${process.env.PORT}!`)
  );
});
