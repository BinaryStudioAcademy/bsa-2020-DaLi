import baseAPIService from './baseAPI.service';
import config from '../../config/index';

const API_URL = `${config.api.url}/api/collections`;

class CollectionsAPIService extends baseAPIService {
  constructor() {
    super(API_URL);
  }

  getCollections = () => this.getData('');

  getCollection = (id) => this.getDataById(`/${id}`);

  deleteCollection = (id) => this.deleteData(`${id}`);

  addCollection = (data) => this.postData('', data);

  updateCollection = (id, updatedUser) => this.patchData(`/${id}`, updatedUser);
}
export const collectionsAPIService = new CollectionsAPIService();
