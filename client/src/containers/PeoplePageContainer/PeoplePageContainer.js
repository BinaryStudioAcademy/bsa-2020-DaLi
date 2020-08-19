import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { PeopleList } from '../../components';
import PeoplePageMenu from './PeoplePageMenu';
import { getUsers, addUser, updateUser, resetError } from './actions';
import { useStyles } from './styles';
import UserGroupsPageContainer from '../UserGroupsPageContainer/UserGroupsPageContainer';
import { getUserGroups } from '../UserGroupsPageContainer/actions';

const PeoplePageContainer = ({
  people,
  isLoading,
  message,
  status,
  getUsers,
  addUser,
  updateUser,
  resetError,
  getUserGroups,
}) => {
  const classes = useStyles();

  useEffect(() => {
    getUsers();
    getUserGroups();
    return () => {
      resetError();
    };
  }, [getUsers, resetError, getUserGroups]);

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
              updateUser={updateUser}
              isLoading={isLoading}
              message={message}
              status={status}
            />
          )}
        />
        <Route exact path="/admin/people/groups" component={() => <UserGroupsPageContainer />} />
      </Switch>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    people: state.admin.people.users,
    isLoading: state.admin.people.isLoading,
    message: state.admin.people.message,
    status: state.admin.people.status,
  };
};

PeoplePageContainer.propTypes = {
  message: PropTypes.string,
  status: PropTypes.string,
  people: PropTypes.array,
  isLoading: PropTypes.bool,
  getUsers: PropTypes.func,
  addUser: PropTypes.func,
  updateUser: PropTypes.func,
  resetError: PropTypes.func,
  getUserGroups: PropTypes.func,
};

export default withRouter(
  connect(mapStateToProps, { getUsers, addUser, updateUser, resetError, getUserGroups })(PeoplePageContainer)
);
