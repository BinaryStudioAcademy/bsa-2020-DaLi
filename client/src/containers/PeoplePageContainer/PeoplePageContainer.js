import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { PeopleList } from '../../components';
import PeoplePageMenu from './PeoplePageMenu';
import {
  getUsers,
  addUser,
  updateUser,
  toggleUserStatus,
  resetError,
  clearTemporaryPassword,
  resetPassword,
} from './actions';
import { useStyles } from './styles';
import UserGroupsPageContainer from '../UserGroupsPageContainer/UserGroupsPageContainer';
import { getUserGroups, getUserGroup } from '../UserGroupsPageContainer/actions';

const PeoplePageContainer = ({
  people,
  isLoading,
  message,
  status,
  getUsers,
  addUser,
  updateUser,
  resetError,
  temporaryPassword,
  clearTemporaryPassword,
  resetPassword,
  getUserGroups,
  match,
  location,
  getUserGroup,
}) => {
  const classes = useStyles();

  const [isTheGroup, setIsTheGroup] = useState(false);

  useEffect(() => {
    if (!match.isExact && location.pathname.split('groups/')[1]) {
      setIsTheGroup(true);
      const id = location.pathname.split('groups/')[1];
      getUserGroup(id);
    } else {
      getUsers();
      getUserGroups();
    }
    return () => {
      resetError();
    };
  }, [getUsers, resetError, getUserGroups, getUserGroup, location.pathname, match.isExact]);

  return (
    <Grid container className={classes.root}>
      <PeoplePageMenu />
      <Switch>
        <Route
          exact
          path="/admin/people"
          component={() => (
            <PeopleList
              people={people}
              addUser={addUser}
              toggleUserStatus={toggleUserStatus}
              updateUser={updateUser}
              isLoading={isLoading}
              message={message}
              status={status}
              temporaryPassword={temporaryPassword}
              clearTemporaryPassword={clearTemporaryPassword}
              resetPassword={resetPassword}
            />
          )}
        />
        <Route
          path="/admin/people/groups/"
          component={() => (
            <UserGroupsPageContainer userGroupsId={location.pathname.split('groups/')[1]} isTheGroup={isTheGroup} />
          )}
        />
      </Switch>
    </Grid>
  );
};

PeoplePageContainer.propTypes = {
  message: PropTypes.string,
  status: PropTypes.string,
  people: PropTypes.array,
  isLoading: PropTypes.bool,
  getUsers: PropTypes.func,
  addUser: PropTypes.func,
  updateUser: PropTypes.func,
  toggleUserStatus: PropTypes.func,
  resetError: PropTypes.func,
<<<<<<< HEAD
  temporaryPassword: PropTypes.string,
  clearTemporaryPassword: PropTypes.func,
  resetPassword: PropTypes.func,
};

const mapStateToProps = ({ admin: { people } }) => {
  return {
    people: people.users,
    isLoading: people.isLoading,
    message: people.message,
    status: people.status,
    temporaryPassword: people.temporaryPassword,
  };
};

const mapDispatchToProps = {
  getUsers,
  addUser,
  updateUser,
  toggleUserStatus,
  resetError,
  clearTemporaryPassword,
  resetPassword,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PeoplePageContainer));
=======
  getUserGroups: PropTypes.func,
  match: PropTypes.object,
  location: PropTypes.object,
  getUserGroup: PropTypes.func,
};

export default withRouter(
  connect(mapStateToProps, { getUsers, addUser, updateUser, resetError, getUserGroups, getUserGroup })(
    PeoplePageContainer
  )
);
>>>>>>> origin/feature/connect-users-group-page-to-BE
