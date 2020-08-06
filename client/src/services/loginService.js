import {
  LOGIN_API_ENDPOINT
} from '../config/API';

export const loginService = (request) => {

  const parameters = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  };
  
  // Temporarily disabled
  // return fetch(LOGIN_API_ENDPOINT, parameters)
  //   .then(response => {
  //     return response.json();
  //   })
  //   .then(json => {
  //     return json;
  //   });

  console.log(request);
};