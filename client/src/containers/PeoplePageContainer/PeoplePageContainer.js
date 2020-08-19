import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { PeopleList, GroupList } from '../../components';
import PeoplePageMenu from './PeoplePageMenu';
import { getUsers, addUser, updateUser, resetError } from './actions';
import { useStyles } from './styles';

const PeoplePageContainer = ({ people, isLoading, message, status, getUsers, addUser, updateUser, resetError }) => {
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

const mapStateToProps = ({ admin: { people } }) => {
  return {
    people: people.users,
    isLoading: people.isLoading,
    message: people.message,
    status: people.status,
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
};

export default withRouter(connect(mapStateToProps, { getUsers, addUser, updateUser, resetError })(PeoplePageContainer));
