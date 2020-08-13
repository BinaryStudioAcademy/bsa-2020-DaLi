import home from './home';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import visualizationRoutes from './visualizationRoutes';

export default (app) => {
  app.use('/', home);
  app.use('/api/users', userRoutes);
  app.use('/api/visualizations', visualizationRoutes);
  app.use('/api/auth', authRoutes);
};
