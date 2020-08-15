import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { Grid, Snackbar } from '@material-ui/core';
import { PeopleList, GroupList } from '../../components';
import PeoplePageMenu from './PeoplePageMenu';
import { getUsers, addUser, resetError } from './actions';
import { useStyles } from './styles';

const PeoplePageContainer = ({ people, isLoading, getUsers, addUser, resetError }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    getUsers();
    return () => {
      resetError();
    };
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    // <div className={classes.root}>
    <Grid container className={classes.root}>
      <PeoplePageMenu />

      <Switch>
        <Route path="/admin/people" component={() => <PeopleList people={people} addUser={addUser} />} />
        <Route path="/admin/groups" component={() => <GroupList />} />
      </Switch>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    people: state.admin.people.users,
    isLoading: state.admin.people.isLoading,
  };
};

PeoplePageContainer.propTypes = {
  people: PropTypes.array,
  isLoading: PropTypes.bool,
  getUsers: PropTypes.func,
  addUser: PropTypes.func,
  resetError: PropTypes.func,
};

export default withRouter(connect(mapStateToProps, { getUsers, addUser, resetError })(PeoplePageContainer));
