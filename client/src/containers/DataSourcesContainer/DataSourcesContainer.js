import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { DataSourcesDatasetsView, DataSourcesTablesView } from '../../components';

const DataSourcesContainer = () => {
  return (
    <Switch>
      <Route exact path="/data-sources" component={() => <DataSourcesDatasetsView />} />
      <Route path="/data-sources/:id" component={() => <DataSourcesTablesView />} />
    </Switch>
  );
};

export default DataSourcesContainer;
