import baseAPIService from './baseAPI.service';
import config from '../../config/index';

const API_URL = `${config.api.url}/api/permissions`;

class PermissionsAPIService extends baseAPIService {
  constructor() {
    super(API_URL);
  }

  getDatabasesPermissions = () => this.getData('/tables');

  getTablesPermissions = (id) => this.getDataById(`/${id}/tables`);

  updatePermissions = (updatedPermissions) => this.patchData('/tables', updatedPermissions);
}

export const permissionsAPIService = new PermissionsAPIService();
