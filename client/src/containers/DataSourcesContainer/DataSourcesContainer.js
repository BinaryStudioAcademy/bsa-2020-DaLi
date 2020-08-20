import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { DataSourcesDatasetsView, DataSourcesTablesView } from '../../components';
import { getDatasets, getTables, setCurrentDbName } from './actions';

import './styles.css';

const DataSourcesContainer = ({ datasets, tables, getDatasets, getTables, setCurrentDbName, currentDbName }) => {
  useEffect(() => {
    getDatasets();
  }, [getDatasets]);

  return (
    <Switch>
      <Route
        exact
        path="/data-sources"
        component={() => (
          <DataSourcesDatasetsView datasets={datasets} getTables={getTables} setCurrentDbName={setCurrentDbName} />
        )}
      />
      <Route
        path="/data-sources/:id"
        render={() => <DataSourcesTablesView tables={tables} currentDbName={currentDbName} />}
      />
    </Switch>
  );
};

DataSourcesContainer.propTypes = {
  datasets: PropTypes.array,
  tables: PropTypes.array,
  getDatasets: PropTypes.func,
  currentDbName: PropTypes.string,
  getTables: PropTypes.func,
  setCurrentDbName: PropTypes.func,
};

const mapStateToProps = ({ datasets }) => ({
  datasets: datasets.datasets,
  currentDbName: datasets.currentDbName,
  tables: datasets.tables,
});

const mapDispatchToProps = { getDatasets, getTables, setCurrentDbName };

export default connect(mapStateToProps, mapDispatchToProps)(DataSourcesContainer);
