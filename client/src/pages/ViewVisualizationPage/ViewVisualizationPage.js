import React from 'react';
import PropTypes from 'prop-types';
import { ViewVisualizationContainer } from '../../containers';

const ViewVisualizationPage = ({ match }) => {
  const { id, tableId, type } = match.params;
  return <ViewVisualizationContainer visualizationId={id} tableId={tableId} visualizationType={type} />;
};

ViewVisualizationPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
      tableId: PropTypes.string,
      type: PropTypes.string,
    }),
  }),
};

export default ViewVisualizationPage;
