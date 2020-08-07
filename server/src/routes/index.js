import home from './home';
import visualizationConfigRoutes from './visualizationConfig';
import userRoutes from './userRoutes';

export default (app) => {
  app.use('/users', userRoutes);
  app.use('/config', visualizationConfigRoutes);
  app.use('/', home);
};
