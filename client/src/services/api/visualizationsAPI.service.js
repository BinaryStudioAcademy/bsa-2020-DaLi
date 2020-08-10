import baseAPIService from './baseAPI.service';
import config from '../../config/index';

const API_URL = config.api.url;

class VisualizationsAPIService extends baseAPIService {
  constructor() {
    super(API_URL);
  }
}

export const visualizationsAPIService = new VisualizationsAPIService();
