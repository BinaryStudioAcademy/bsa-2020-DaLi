import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getVisualizations, dltVisualizations, resetError } from './actions';
import VisualizationsList from '../../components/VisualizationsList/VisualizationsList';

const VisualizationsListContainer = ({
  visualizations,
  isLoading,
  getVisualizations,
  dltVisualizations,
  resetError,
}) => {
  useEffect(() => {
    getVisualizations();
    return () => {
      resetError();
    };
  }, []);

  const deleteItem = (id) => () => {
    dltVisualizations(id);
  };

  return <VisualizationsList visualizations={visualizations} isLoading={isLoading} deleteItem={deleteItem} />;
};

VisualizationsListContainer.propTypes = {
  visualizations: PropTypes.array,
  isLoading: PropTypes.bool,
  getVisualizations: PropTypes.func,
  dltVisualizations: PropTypes.func,
  resetError: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    visualizations: state.visualizations.visualizations,
    isLoading: state.visualizations.isLoading,
  };
};

export default connect(mapStateToProps, { getVisualizations, dltVisualizations, resetError })(
  VisualizationsListContainer
);
