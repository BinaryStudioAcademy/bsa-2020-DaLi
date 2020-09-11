import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Button, Typography } from '@material-ui/core';

import './styles.css';

const DatabaseListHeader = () => {
  const history = useHistory();

  const handleAddDatabase = () => {
    history.push('connection-database');
  };

  return (
    <Grid className="database-list-header-container">
      <Typography variant="h1" color="textPrimary">
        Databases
      </Typography>
      <Button size="large" variant="contained" color="primary" onClick={handleAddDatabase}>
        Add Database
      </Button>
    </Grid>
  );
};

export default DatabaseListHeader;
