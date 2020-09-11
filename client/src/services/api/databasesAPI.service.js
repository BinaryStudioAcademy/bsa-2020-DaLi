import baseAPIService from './baseAPI.service';
import config from '../../config/index';

const API_URL = `${config.api.url}/api/databases`;

class DatabasesAPIService extends baseAPIService {
  constructor() {
    super(API_URL);
  }

  syncDatabaseTables = (id) => this.patchData(`/${id}/tables/update`);

  getDatabases = () => this.getData('');

  getDatabase = (id) => this.getDataById(`/${id}`);

  deleteDatabase = (id) => this.deleteData(`${id}`);

  addDatabase = (data) => this.postData('', data);

  getTables = (id) => this.getDataById(`/${id}/tables`);
}
export const databasesAPIService = new DatabasesAPIService();
