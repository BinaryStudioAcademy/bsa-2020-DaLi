import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PeoplePageContainer from '../PeoplePageContainer/PeoplePageContainer';
import DatabasesPageContainer from '../DatabasesPageContainer/DatabasesPageContainer';

function AdminContainer() {
  return (
    <main>
      <Switch>
        <Route path="/admin/people" component={PeoplePageContainer} />
        <Route exact path="/admin/databases" component={DatabasesPageContainer} />
        <Route
          exact
          path="/admin/databases/:id"
          component={({ match }) => {
            return <div>Database id {match.params.id}</div>;
          }}
        />
        <Route exact path="/admin/permissions" component={() => <div>permissions</div>} />
      </Switch>
    </main>
  );
}

export default AdminContainer;
