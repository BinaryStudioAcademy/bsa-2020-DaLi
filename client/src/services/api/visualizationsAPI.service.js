import baseAPIService from './baseAPI.service';
import config from '../../config/index';

const API_URL = `${config.api.url}/api/visualizations`;

class VisualizationsAPIService extends baseAPIService {
  constructor() {
    super(API_URL);
  }

  getVisualizations = () => this.getData('');

  getVisualization = (id) => this.getData(`/${id}`);

  createVisualization = (newVisualization) => this.postData('', newVisualization);

  updateVisualization = (id, updatedVisualization) => this.patchData(`/${id}`, updatedVisualization);

  deleteVisualization = (id) => this.deleteData(`${id}`);
}

export const visualizationsAPIService = new VisualizationsAPIService();
