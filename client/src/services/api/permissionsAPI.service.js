import baseAPIService from './baseAPI.service';
import config from '../../config/index';

const API_URL = `${config.api.url}/api/permissions`;

class PermissionsAPIService extends baseAPIService {
  constructor() {
    super(API_URL);
  }

  getDatabasesPermissions = () => this.getData('');

  getTablesPermissions = (id) => this.getDataById(`/${id}`);

  updatePermissions = (updatedPermissions) => this.patchData('', updatedPermissions);
}

export const permissionsAPIService = new PermissionsAPIService();
