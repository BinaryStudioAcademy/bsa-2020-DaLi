import home from './home';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import visualizationRoutes from './visualizationRoutes';
import dashboardRoutes from './dashboardRoutes';
import authorizeMiddleware from '../middlewares/authorizeMiddleware';

export default (app) => {
  app.use('/', home);
  app.use('/api/users', authorizeMiddleware, userRoutes);
  app.use('/api/visualizations', authorizeMiddleware, visualizationRoutes);
  app.use('/api/auth', authorizeMiddleware, authRoutes);
  app.use('/api/dashboards', authorizeMiddleware, dashboardRoutes);
};
