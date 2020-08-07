import React from 'react';
import { connect } from 'react-redux';

import VisualizationsList from '../../components/VisualizationsList/VisualizationsList';

const VisualizationsListContainer = () => {
  return <VisualizationsList />;
};

export default connect(null, null)(VisualizationsListContainer);
