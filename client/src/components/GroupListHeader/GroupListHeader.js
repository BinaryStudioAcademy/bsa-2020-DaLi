import React from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import './styles.css';

const GroupListHeader = ({ openForm, title, buttonTitle }) => {
  return (
    <Grid className="group-list-header-container">
      <Typography variant="h1" color="textPrimary">
        {title}
      </Typography>
      <Button size="large" variant="contained" color="primary" onClick={openForm}>
        {buttonTitle}
      </Button>
    </Grid>
  );
};

GroupListHeader.propTypes = {
  openForm: PropTypes.func,
  title: PropTypes.string,
  buttonTitle: PropTypes.string,
  id: PropTypes.string,
};

export default GroupListHeader;
