import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, Typography } from '@material-ui/core';
import { useStyles } from './styles';
import AddUserModal from '../AddUserModal';

const PeopleListHeader = ({ addUser }) => {
  const classes = useStyles();
  const [addUserModalVisible, setAddUserModalVisible] = useState(false);

  const hideAddUserModal = () => {
    setAddUserModalVisible(false);
  };

  const showAddUserModal = () => {
    setAddUserModalVisible(true);
  };

  return (
    <div>
      <Grid className={classes.peopleListHeader}>
        <Typography className={classes.peopleListTitle}>People</Typography>
        <Button className={classes.addPersonButton} variant="contained" onClick={showAddUserModal}>
          Add someone
        </Button>
      </Grid>
      <AddUserModal isVisible={addUserModalVisible} closeModal={hideAddUserModal} addUser={addUser} />
    </div>
  );
};

PeopleListHeader.propTypes = {
  addUser: PropTypes.func,
};

export default PeopleListHeader;
