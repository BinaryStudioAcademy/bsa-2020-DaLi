import * as axios from 'axios';

const baseRequest = async (request) => {
  try {
    return (await axios(request)).data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.response?.data?.message || error.message);
  }
};

class baseAPIService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  getData(endpoint, params) {
    return baseRequest({
      method: 'get',
      url: `${this.baseURL}${endpoint}`,
      params,
    });
  }

  // endpoint example = 'users/12'
  getDataById(endpoint, params) {
    return baseRequest({
      method: 'get',
      url: `${this.baseURL}${endpoint}`,
      params,
    });
  }

  postData(endpoint, data) {
    return baseRequest({
      method: 'post',
      url: `${this.baseURL}${endpoint}`,
      data,
    });
  }

  putData(endpoint, data) {
    return baseRequest({
      method: 'put',
      url: `${this.baseURL}${endpoint}`,
      data,
    });
  }

  // endpoint example = 'users/12'
  deleteData(endpoint, params) {
    return baseRequest({
      method: 'delete',
      url: `${this.baseURL}${endpoint}`,
      params,
    });
  }
}

export default baseAPIService;
