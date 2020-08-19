import React from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useStyles } from './styles';

const GroupListHeader = ({ openForm }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.groupListHeader}>
      <Typography className={classes.groupListTitle}>Groups</Typography>
      <Button className={classes.addGroupButton} variant="contained" onClick={openForm}>
        Create group
      </Button>
    </Grid>
  );
};

GroupListHeader.propTypes = {
  openForm: PropTypes.func,
};

export default GroupListHeader;
