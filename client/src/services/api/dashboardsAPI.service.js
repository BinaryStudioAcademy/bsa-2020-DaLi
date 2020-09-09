import baseAPIService from './baseAPI.service';
import config from '../../config/index';

const API_URL = `${config.api.url}/api/dashboards`;

class DashboardsAPIService extends baseAPIService {
  constructor() {
    super(API_URL);
  }

  getDashboards = () => this.getData('');

  createDashboard = (newDashboard) => this.postData('', newDashboard);

  updateDashboard = (id, updatedDashboard) => this.patchData(`/${id}`, updatedDashboard);

  deleteDashboard = (id) => this.deleteData(`${id}`);

  getDashboard = (id) => this.getDataById(`/${id}`);

  addVisualizationToDashboard = (dashboardId, visualizationId) => this.postData(`/${dashboardId}`, { visualizationId });

  addToCollection = (dashboardId, collectionId) =>
    this.patchDataWithParams(`/${dashboardId}`, { collection: collectionId });

  deleteVisualizationFromDashboard = (dashboardId, dashboardVisualizationsId) => {
    this.deleteData(`${dashboardId}`, { dashboardVisualizationsId });
  };
}

export const dashboardsAPIService = new DashboardsAPIService();
