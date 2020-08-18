import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { PeopleList, GroupList } from '../../components';
import PeoplePageMenu from './PeoplePageMenu';
import { getUsers, addUser, updateUser, toggleUserStatus, resetError } from './actions';
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
}) => {
  const classes = useStyles();

  useEffect(() => {
    // debugger;
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
            />
          )}
        />
        <Route exact path="/admin/people/groups" component={() => <GroupList />} />
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
  toggleUserStatus: PropTypes.func,
  resetError: PropTypes.func,
};

export default withRouter(
  connect(mapStateToProps, { getUsers, addUser, updateUser, toggleUserStatus, resetError })(PeoplePageContainer)
);
