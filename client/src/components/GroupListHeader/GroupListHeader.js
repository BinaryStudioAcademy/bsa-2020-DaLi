import React from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useStyles } from './styles';

const GroupListHeader = ({ openForm, title, buttonTitle }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.groupListHeader}>
      <Typography className={classes.groupListTitle}>{title}</Typography>
      <Button className={classes.addGroupButton} variant="contained" onClick={openForm}>
        {buttonTitle}
      </Button>
    </Grid>
  );
};

GroupListHeader.propTypes = {
  openForm: PropTypes.func,
  title: PropTypes.string,
  buttonTitle: PropTypes.string,
};

export default GroupListHeader;
