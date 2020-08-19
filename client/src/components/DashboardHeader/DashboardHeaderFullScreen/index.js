import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Tooltip } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';

import useStyles from './styles';

const DashboardHeaderFullScreen = (props) => {
  const { name, description, onSetDefaultViewMode } = props;
  const classes = useStyles();
  return (
    <Grid className={classes.dashboardFullScreenHeader}>
      <Grid className={classes.dashboardFullScreenTitle} item container>
        <Typography className={classes.dashboardFullScreenName}>{name}</Typography>
        <Tooltip
          classes={{
            tooltip: classes.dashboardFullScreenDescription,
          }}
          title={description}
        >
          <InfoIcon className={classes.dashboardFullScreenDescriptionIcon} />
        </Tooltip>
      </Grid>
      <FullscreenExitIcon className={classes.dashboardFullScreenButton} onClick={onSetDefaultViewMode} />
    </Grid>
  );
};

DashboardHeaderFullScreen.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  onSetDefaultViewMode: PropTypes.func,
};

export default DashboardHeaderFullScreen;
