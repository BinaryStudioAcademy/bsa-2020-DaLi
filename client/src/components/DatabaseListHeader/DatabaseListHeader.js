import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Button, Typography } from '@material-ui/core';
import { useStyles } from './styles';

const DatabaseListHeader = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleAddDatabase = () => {
    history.push('/connection-database');
  };

  return (
    <div>
      <Grid className={classes.databaseListHeader}>
        <Typography className={classes.databaseListTitle}>Databases</Typography>
        <Button className={classes.addDatabaseButton} variant="contained" onClick={handleAddDatabase}>
          Add Database
        </Button>
      </Grid>
    </div>
  );
};

export default DatabaseListHeader;
