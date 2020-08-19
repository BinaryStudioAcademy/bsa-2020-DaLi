import * as axios from 'axios';
import { getToken } from '../../helpers/jwtToken';

const baseRequest = async (request) => {
  try {
    return (await axios(request)).data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || error.response.message || error.response?.data?.error
    );
  }
};

class baseAPIService {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.accessToken = getToken() || '';
  }

  getData = async (endpoint, params) => {
    const response = await baseRequest({
      method: 'GET',
      url: `${this.baseURL}${endpoint}`,
      headers: { Authorization: `Bearer ${this.accessToken}` },
      params,
    });

    return response;
  };

  getDataById = async (endpoint, params) => {
    const response = await baseRequest({
      method: 'get',
      url: `${this.baseURL}${endpoint}`,
      headers: { Authorization: `Bearer ${this.accessToken}` },
      params,
    });

    return response;
  };

  postData = async (endpoint, data) => {
    const response = await baseRequest({
      method: 'post',
      url: `${this.baseURL}${endpoint}`,
      headers: { Authorization: `Bearer ${this.accessToken}` },
      data,
    });

    return response;
  };

  putData = async (endpoint, data) => {
    const response = await baseRequest({
      method: 'put',
      url: `${this.baseURL}${endpoint}`,
      headers: { Authorization: `Bearer ${this.accessToken}` },
      data,
    });

    return response;
  };

  patchData = async (endpoint, data) => {
    const response = await baseRequest({
      method: 'patch',
      url: `${this.baseURL}${endpoint}`,
      headers: { Authorization: `Bearer ${this.accessToken}` },
      data,
    });
    return response;
  };

  deleteData = async (endpoint, params) => {
    const response = await baseRequest({
      method: 'delete',
      url: `${this.baseURL}/${endpoint}`,
      headers: { Authorization: `Bearer ${this.accessToken}` },
      params,
    });

    return response;
  };
}

export default baseAPIService;
