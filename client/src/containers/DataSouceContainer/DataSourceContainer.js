import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { DataSourceDatasetsView, DataSourceTablesView } from '../../components';

const DataSourceContainer = () => {
  return (
    <Switch>
      <Route exact path="/data-source" component={() => <DataSourceDatasetsView />} />
      <Route path="/data-source/:id" component={() => <DataSourceTablesView />} />
    </Switch>
  );
};

export default DataSourceContainer;
