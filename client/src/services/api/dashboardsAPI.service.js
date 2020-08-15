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
}

export const dashboardsAPIService = new DashboardsAPIService();
