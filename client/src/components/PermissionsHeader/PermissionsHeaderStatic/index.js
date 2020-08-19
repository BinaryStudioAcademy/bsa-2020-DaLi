import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import useStyles from './styles';

const PermissionsHeaderStatic = (props) => {
  const { onSetEdit } = props;
  const classes = useStyles();
  return (
    <Grid className={classes.permissionsStaticHeader}>
      <EditIcon className={classes.permissionsStaticButton} onClick={onSetEdit} />
    </Grid>
  );
};

PermissionsHeaderStatic.propTypes = {
  onSetEdit: PropTypes.func,
};

export default PermissionsHeaderStatic;
