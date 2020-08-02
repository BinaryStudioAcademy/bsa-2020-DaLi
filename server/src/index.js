import "dotenv/config";
import cors from "cors";
import express from "express";

import { sequelize } from "./models";
import routes from "./routes";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes.home);

sequelize.sync().then(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`App is listening on port ${process.env.PORT}!`)
  );
});
