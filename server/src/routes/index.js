import home from './home';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import visualizationRoutes from './visualizationRoutes';
import dashboardRoutes from './dashboardRoutes';
import userGroupsRoutes from './userGroupsRoutes';
import databaseRoutes from './databaseRoutes';
import permissionRoutes from './permissionRoutes';
import dbTableRoutes from './dbTableRoutes';
import collectionRoutes from './collectionRoutes';

export default (app) => {
  app.use('/', home);
  app.use('/api/users', userRoutes);
  app.use('/api/visualizations', visualizationRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/dashboards', dashboardRoutes);
  app.use('/api/user-groups', userGroupsRoutes);
  app.use('/api/databases', databaseRoutes);
  app.use('/api/permissions', permissionRoutes);
  app.use('/api/tables', dbTableRoutes);
  app.use('/api/collection', collectionRoutes);
};
