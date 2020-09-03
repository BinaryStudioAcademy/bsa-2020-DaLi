import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';
import FullscreenIcon from '@material-ui/icons/Fullscreen';

import useStyles from './styles';

const DashboardHeaderStatic = (props) => {
  const { name, description, onSetEdit, onSetFullScreenViewMode } = props;
  const classes = useStyles();
  return (
    <Grid>
      <Grid item container>
        <Typography>{name}</Typography>
        {description?.length ? (
          <Tooltip
            classes={{
              tooltip: classes.dashboardStaticDescription,
            }}
            title={description}
          >
            <InfoIcon />
          </Tooltip>
        ) : null}
      </Grid>
      <Grid item container>
        <EditIcon onClick={onSetEdit} />
        <FullscreenIcon onClick={onSetFullScreenViewMode} />
      </Grid>
    </Grid>
  );
};

DashboardHeaderStatic.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  onSetEdit: PropTypes.func,
  onSetFullScreenViewMode: PropTypes.func,
};

export default DashboardHeaderStatic;
