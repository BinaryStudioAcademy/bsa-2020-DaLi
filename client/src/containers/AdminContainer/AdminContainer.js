import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PeoplePageContainer from '../PeoplePageContainer/PeoplePageContainer';
import PermissionsContainer from '../PermissionsContainer/PermissionsContainer';
import DatabasesPageContainer from '../DatabasesPageContainer/DatabasesPageContainer';
// import { ConnectionDatabasePage } from '../../pages/ConnectionDatabasePage';
import ConnectionDatabaseContainer from '../ConnectionDatabaseContainer/ConnectionDatabaseContainer';

function AdminContainer() {
  return (
    <main>
      <Switch>
        <Route exact path="/admin/permissions" component={PermissionsContainer} />
        <Route exact path="/admin/permissions/:id" component={PermissionsContainer} />
        <Route path="/admin/people" component={PeoplePageContainer} />
        <Route exact path="/admin/databases" component={DatabasesPageContainer} />
        <Route
          exact
          path="/admin/databases/:id"
          component={({ match }) => {
            return <div>Database id {match.params.id}</div>;
          }}
        />
        <Route path="/admin/connection-database" component={ConnectionDatabaseContainer} />
      </Switch>
    </main>
  );
}

export default AdminContainer;
