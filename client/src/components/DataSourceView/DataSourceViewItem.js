import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import AppsIcon from '@material-ui/icons/Apps';
import InfoIcon from '@material-ui/icons/Info';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
  infoIcon: {
    marginLeft: 'auto',
  },
  description: {
    color: '#808080',
  },
}));

const DataSourceViewItem = ({ table }) => {
  const classes = useStyles();

  return (
    <Grid item className="data-source-table-item" onClick={() => alert(`Go to ${table.name} view page`)}>
      <div className="data-source-table-item-icon">
        <AppsIcon style={{ color: '#7073a9', fontSize: 30 }} />
      </div>
      <p>{table.name}</p>
      <Tooltip title={table.description} placement="left" className={classes.description}>
        <InfoIcon className={classes.infoIcon} color="action" fontSize="small" />
      </Tooltip>
    </Grid>
  );
};

DataSourceViewItem.propTypes = {
  table: PropTypes.object,
};

export default DataSourceViewItem;
