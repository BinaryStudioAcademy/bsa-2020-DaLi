import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DataSourcesDatasetsView } from '../../components';
import { getDatasets, getTables, setCurrentDbName } from './actions';

const DataSourcesDatasetsContainer = ({ datasets, getDatasets, getTables, setCurrentDbName }) => {
  useEffect(() => {
    getDatasets();
  }, [getDatasets]);

  return <DataSourcesDatasetsView datasets={datasets} getTables={getTables} setCurrentDbName={setCurrentDbName} />;
};

DataSourcesDatasetsContainer.propTypes = {
  datasets: PropTypes.array,
  getDatasets: PropTypes.func,
  getTables: PropTypes.func,
  setCurrentDbName: PropTypes.func,
};

const mapStateToProps = ({ datasets }) => ({
  datasets: datasets.datasets,
});

const mapDispatchToProps = { getDatasets, getTables, setCurrentDbName };

export default connect(mapStateToProps, mapDispatchToProps)(DataSourcesDatasetsContainer);
