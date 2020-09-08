import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { DataSourcesDatasetsView } from '../../components';
import { getDatasets } from './actions';

const DataSourcesDatasetsContainer = ({ datasets, getDatasets }) => {
  useEffect(() => {
    getDatasets();
  }, [getDatasets]);

  return !datasets.length ? (
    <div style={{ position: 'relative' }}>
      <CircularProgress size={40} left={-20} top={10} style={{ marginLeft: '50%' }} />
    </div>
  ) : (
    <DataSourcesDatasetsView datasets={datasets} />
  );
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
