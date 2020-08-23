import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
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
  getMembership,
} from './actions';
import { addUserToGroup, getUserGroups, getUserGroup, deleteUserFromGroup } from '../UserGroupsPageContainer/actions';
import UserGroupsPageContainer from '../UserGroupsPageContainer/UserGroupsPageContainer';
import { useStyles } from './styles';

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
  getMembership,
  membership,
  addUserToGroup,
  deleteUserFromGroup,
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
      getMembership();
      getUserGroups();
    }
    return () => {
      resetError();
    };
  }, [getUsers, getMembership, resetError, getUserGroups, getUserGroup, location.pathname, match.isExact]);

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
              membership={membership}
              addUserToGroup={addUserToGroup}
              deleteUserFromGroup={deleteUserFromGroup}
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
  temporaryPassword: PropTypes.string,
  clearTemporaryPassword: PropTypes.func,
  resetPassword: PropTypes.func,
  getUserGroups: PropTypes.func,
  match: PropTypes.object,
  location: PropTypes.object,
  getUserGroup: PropTypes.func,
  getMembership: PropTypes.func,
  membership: PropTypes.array,
  addUserToGroup: PropTypes.func,
  deleteUserFromGroup: PropTypes.func,
};

const mapStateToProps = ({ admin: { people, groups } }) => {
  return {
    people: people.users,
    membership: people.membership,
    isLoading: people.isLoading,
    message: people.message,
    status: people.status,
    temporaryPassword: people.temporaryPassword,
    groups: groups.groups,
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
  getUserGroups,
  getUserGroup,
  getMembership,
  addUserToGroup,
  deleteUserFromGroup,
};

export default connect(mapStateToProps, mapDispatchToProps)(PeoplePageContainer);
