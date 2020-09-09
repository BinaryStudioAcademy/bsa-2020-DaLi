import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, Typography } from '@material-ui/core';
import AddUserModal from '../AddUserModal';

import './styles.css';

const PeopleListHeader = ({ addUser }) => {
  const [addUserModalVisible, setAddUserModalVisible] = useState(false);

  const hideAddUserModal = () => {
    setAddUserModalVisible(false);
  };

  const showAddUserModal = () => {
    setAddUserModalVisible(true);
  };

  return (
    <>
      <Grid className="people-list-header-container">
        <Typography variant="h1" color="textPrimary">
          People
        </Typography>
        <Button size="large" variant="contained" color="primary" onClick={showAddUserModal}>
          Add someone
        </Button>
      </Grid>
      <AddUserModal isVisible={addUserModalVisible} closeModal={hideAddUserModal} submitHandler={addUser} />
    </>
  );
};

PeopleListHeader.propTypes = {
  addUser: PropTypes.func,
};

export default PeopleListHeader;
