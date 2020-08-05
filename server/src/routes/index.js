import home from "./home";
import visualizationConfigRoutes from "./visualizationConfig";

export default (app) => {
  app.use("/config", visualizationConfigRoutes);
  app.use("/", home);
};
