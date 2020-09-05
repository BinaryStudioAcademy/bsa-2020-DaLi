import baseAPIService from './baseAPI.service';
import config from '../../config/index';

const API_URL = `${config.api.url}/api/tables`;

class DbTableAPIService extends baseAPIService {
  constructor() {
    super(API_URL);
  }

  getTableData = (id, settings) => this.postData(`/${id}/data`, settings);

  getTableSchema = (id) => this.getDataById(`/${id}/schema`);
}
export const dbTableAPIService = new DbTableAPIService();
