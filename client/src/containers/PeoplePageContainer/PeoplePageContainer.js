import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { PeopleList, GroupList } from '../../components';
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

const PeoplePageContainer = ({
  people,
  isLoading,
  message,
  status,
  getUsers,
  addUser,
  updateUser,
  toggleUserStatus,
  resetError,
  temporaryPassword,
  clearTemporaryPassword,
  resetPassword,
}) => {
  const classes = useStyles();

  useEffect(() => {
    getUsers();
    return () => {
      resetError();
    };
  }, [getUsers, resetError]);

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
        <Route exact path="/admin/people/groups" component={() => <GroupList />} />
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
