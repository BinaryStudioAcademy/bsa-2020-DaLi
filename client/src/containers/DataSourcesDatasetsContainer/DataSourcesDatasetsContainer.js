import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DataSourcesDatasetsView } from '../../components';
import { getDatasets } from './actions';

const DataSourcesDatasetsContainer = ({ datasets, getDatasets }) => {
  useEffect(() => {
    getDatasets();
  }, [getDatasets]);

  return <DataSourcesDatasetsView datasets={datasets} />;
};

DataSourcesDatasetsContainer.propTypes = {
  datasets: PropTypes.array,
  getDatasets: PropTypes.func,
};

const mapStateToProps = ({ datasets }) => ({
  datasets: datasets.datasets,
});

const mapDispatchToProps = { getDatasets };

export default connect(mapStateToProps, mapDispatchToProps)(DataSourcesDatasetsContainer);
