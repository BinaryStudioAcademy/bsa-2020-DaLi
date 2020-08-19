import React from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import { useStyles } from './styles';

const GroupListHeader = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.groupListHeader}>
      <Typography className={classes.groupListTitle}>Groups</Typography>
      <Button className={classes.addGroupButton} variant="contained" onClick={() => {}}>
        Create group
      </Button>
    </Grid>
  );
};

export default GroupListHeader;
