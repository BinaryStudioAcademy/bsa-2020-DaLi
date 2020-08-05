import * as axios from 'axios';
import qs from 'qs';

class baseAPIService {
  constructor(baseURL) {
    this.instance = axios.create({
      withCredentials: true,
      baseURL,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  }

  async getData(endpoint) {
    try {
      const res = await this.instance.get(`${endpoint}`);
      return res.data;
    } catch (err) {
      return JSON.parse(err.request.responseText);
    }
  }

  // endpoint example = 'users/12'
  async getDataById(endpoint) {
    try {
      const res = await this.instance.get(`${endpoint}`);
      return res.data;
    } catch (err) {
      return JSON.parse(err.request.responseText);
    }
  }

  async postData(endpoint, data) {
    try {
      const query = qs.stringify(data);
      const res = await this.instance.post(`${endpoint}`, query);
      return res.data;
    } catch (err) {
      return JSON.parse(err.request.responseText);
    }
  }

  async putData(endpoint, data) {
    try {
      const query = qs.stringify(data);
      const res = await this.instance.put(`${endpoint}`, query);
      return res.data;
    } catch (err) {
      return JSON.parse(err.request.responseText);
    }
  }

  // endpoint example = 'users/12'
  async deleteData(endpoint) {
    try {
      const res = await this.instance.delete(`${endpoint}`);
      return res.data;
    } catch (err) {
      return JSON.parse(err.request.responseText);
    }
  }
}

export default baseAPIService;
