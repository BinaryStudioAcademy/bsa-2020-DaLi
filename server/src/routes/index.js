import home from './home';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import visualizationRoutes from './visualizationRoutes';
import visualizationConfigRoutes from './visualizationConfig';

export default (app) => {
  app.use('/', home);
  app.use('/api/users', userRoutes);
  app.use('/api/visualizations', visualizationRoutes);
  app.use('/api/config', visualizationConfigRoutes);
  app.use('/api/auth', authRoutes);
};
