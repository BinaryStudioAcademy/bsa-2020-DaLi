import callApi from '../../helpers/callApi';

export const saveVisualization = async (id, request) => {
  const response = await callApi({
    endpoint: `http://localhost:5000/api/visualizations/${id}`,
    type: 'PATCH',
    request,
  });
  return response.json();
};
