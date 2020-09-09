import baseAPIService from './baseAPI.service';
import config from '../../config/index';

const API_URL = `${config.api.url}/api/permissions/collections`;

class CollectionPermissionsAPIService extends baseAPIService {
  constructor() {
    super(API_URL);
  }

  getCollectionsPermissions = () => this.getData('');

  getTablesPermissions = (id) => this.getDataById(`/${id}`);

  updatePermissions = (updatedPermissions) => this.patchData('', updatedPermissions);
}

export const collectionPermissionsAPIService = new CollectionPermissionsAPIService();
