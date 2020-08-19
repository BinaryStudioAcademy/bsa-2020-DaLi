import home from './home';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import visualizationRoutes from './visualizationRoutes';
import dashboardRoutes from './dashboardRoutes';
import databaseRoutes from './databaseRoutes';
import dbTableRoutes from './dbTableRoutes';

export default (app) => {
  app.use('/', home);
  app.use('/api/users', userRoutes);
  app.use('/api/visualizations', visualizationRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/dashboards', dashboardRoutes);
  app.use('/api/databases', databaseRoutes);
  app.use('/api/tables', dbTableRoutes);
};
