import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import PeoplePageContainer from '../PeoplePageContainer/PeoplePageContainer';

function AdminContainer() {
  return (
    <main>
      <Switch>
        <Route path="/admin/people" component={() => <PeoplePageContainer />} />
        <Route exact path="/admin/databases" component={() => <div>databases</div>}/>
        <Route exact path="/admin/permissions" component={() => <div>permissions</div>} />
      </Switch>
    </main>
  );
}

export default withRouter(AdminContainer);
