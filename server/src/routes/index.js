import home from "./home";
import authRoutes from "./auth";
import visualizationConfigRoutes from "./visualizationConfig";

export default (app) => {
    app.use("/", home);
    app.use("/config", visualizationConfigRoutes);
    app.use('/api/auth', authRoutes);
};
