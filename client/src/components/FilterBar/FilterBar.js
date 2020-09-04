import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../containers/ViewVisualizationContainer/actions';

import './styles.css';

const FilterBar = () => {
  return <div>Filter</div>;
};

const mapStateToProps = (state) => {
  return {
    schema: state.currentVisualization.schema,
    datasetSettings: state.currentVisualization.datasetSettings,
  };
};

// dispatch to ViewVisualizationContainer reducer
const mapDispatchToProps = {
  ...actions,
};

FilterBar.propTypes = {
  schema: PropTypes.object,
  datasetSettings: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
