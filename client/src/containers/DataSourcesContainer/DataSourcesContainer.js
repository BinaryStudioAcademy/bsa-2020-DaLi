import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { DataSourcesDatasetsView, DataSourcesTablesView } from '../../components';
import { getDatasets, getTables, getDatasetId } from './actions';

const DataSourcesContainer = ({ datasets, tables, getDatasets, getTables, currentDatasetId, getDatasetId }) => {
  useEffect(() => {
    getDatasets();
  }, [getDatasets]);

  return (
    <Switch>
      <Route
        exact
        path="/data-sources"
        component={() => <DataSourcesDatasetsView datasets={datasets} getDatasetId={getDatasetId} />}
      />
      <Route
        path="/data-sources/:id"
        component={() => (
          <DataSourcesTablesView tables={tables} getTables={getTables} currentDatasetId={currentDatasetId} />
        )}
      />
    </Switch>
  );
};

DataSourcesContainer.propTypes = {
  datasets: PropTypes.array,
  tables: PropTypes.array,
  getDatasets: PropTypes.func,
  getTables: PropTypes.func,
  currentDatasetId: PropTypes.string,
  getDatasetId: PropTypes.func,
};

const mapStateToProps = ({ datasets }) => ({
  datasets: datasets.datasets,
  tables: datasets.tables,
  currentDatasetId: datasets.currentDatasetId,
});

const mapDispatchToProps = { getDatasets, getTables, getDatasetId };

export default connect(mapStateToProps, mapDispatchToProps)(DataSourcesContainer);
