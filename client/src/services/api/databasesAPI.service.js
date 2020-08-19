import baseAPIService from './baseAPI.service';
import config from '../../config/index';

const API_URL = `${config.api.url}/api/databases`;

class DatabasesAPIService extends baseAPIService {
  constructor() {
    super(API_URL);
  }

  getDatabases = () => this.getData('');

  deleteDatabase = (id) => this.deleteData(`${id}`);

  addDatabase = (data) => this.postData('', data);

  getTables = (id) => this.getDataById(`/tables/${id}`);
}
export const databasesAPIService = new DatabasesAPIService();
