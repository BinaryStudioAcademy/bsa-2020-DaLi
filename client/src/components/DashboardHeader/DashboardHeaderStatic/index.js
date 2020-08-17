import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';
import FullscreenIcon from '@material-ui/icons/Fullscreen';

import useStyles from './styles';

const DashboardHeader = (props) => {
  const { name, description, onSetEdit } = props;
  const classes = useStyles();
  return (
    <Grid className={classes.dashboardStaticHeader}>
      <Grid className={classes.dashboardStaticTitle} item container>
        <Typography className={classes.dashboardStaticName}>{name}</Typography>
        <Tooltip
          classes={{
            tooltip: classes.dashboardStaticDescription,
          }}
          title={description}
        >
          <InfoIcon className={classes.dashboardStaticDescriptionIcon} />
        </Tooltip>
      </Grid>
      <Grid className={classes.dashboardStaticControls} item container>
        <EditIcon
          className={`${classes.dashboardStaticControlsItem} ${classes.dashboardStaticControlsItemEdit}`}
          onClick={onSetEdit}
        />
        <FullscreenIcon className={classes.dashboardStaticControlsItem} />
      </Grid>
    </Grid>
  );
};

DashboardHeader.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  onSetEdit: PropTypes.func,
};

export default DashboardHeader;
