import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PeoplePageContainer from '../PeoplePageContainer/PeoplePageContainer';
import DatabasePageContainer from '../DatabasePageContainer/DatabasePageContainer';

function AdminContainer() {
  return (
    <main>
      <Switch>
        <Route path="/admin/people" component={PeoplePageContainer} />
        <Route exact path="/admin/databases" component={DatabasePageContainer} />
        <Route exact path="/admin/permissions" component={() => <div>permissions</div>} />
      </Switch>
    </main>
  );
}

export default AdminContainer;
