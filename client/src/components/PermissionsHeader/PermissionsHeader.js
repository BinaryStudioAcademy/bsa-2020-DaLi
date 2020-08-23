import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Button } from '@material-ui/core';

import useStyles from './styles';

const PermissionsHeader = (props) => {
  const { onCancelChanges, onModalOpen } = props;
  const classes = useStyles();
  return (
    <Grid className={classes.permissionsEditingHeader} container>
      <Typography className={classes.permissionsEditingHeaderTitle}>You&apos;ve made changes to permissions</Typography>
      <Grid className={classes.permissionsEditingHeaderButtons}>
        <Button
          className={`${classes.permissionsEditingHeaderButton} ${classes.permissionsEditingHeaderButtonCancel}`}
          onClick={onCancelChanges}
        >
          Cancel
        </Button>
        <Button
          className={`${classes.permissionsEditingHeaderButton} ${classes.permissionsEditingHeaderButtonSave}`}
          onClick={onModalOpen}
        >
          Save Changes
        </Button>
      </Grid>
    </Grid>
  );
};

PermissionsHeader.propTypes = {
  onCancelChanges: PropTypes.func,
  onModalOpen: PropTypes.func,
};

export default PermissionsHeader;
