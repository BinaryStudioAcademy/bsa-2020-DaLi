import home from './home';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import visualizationConfigRoutes from './visualizationConfig';

export default (app) => {
  app.use('/', home);
  app.use('/users', userRoutes);
  app.use('/config', visualizationConfigRoutes);
  app.use('/auth', authRoutes);
};
