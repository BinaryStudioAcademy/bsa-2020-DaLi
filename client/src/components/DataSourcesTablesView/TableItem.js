import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import AppsIcon from '@material-ui/icons/Apps';
import InfoIcon from '@material-ui/icons/Info';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  infoIcon: {
    marginLeft: 'auto',
  },
  description: {
    color: '#808080',
  },
}));

const TableItem = ({ table }) => {
  const history = useHistory();
  const classes = useStyles();

  const onTableClick = () => {
    history.push({
      pathname: '/select-visualization',
      state: { tableId: table.id },
    });
  };

  return (
    <Grid item className="data-source-item table-item" onClick={() => onTableClick()}>
      <div className="data-source-table-item-icon">
        <AppsIcon style={{ color: '#7073a9', fontSize: 30 }} />
      </div>
      <p>{table.name}</p>
      <Tooltip title={`This is the ${table.name} table`} placement="left" className={classes.description}>
        <InfoIcon className={classes.infoIcon} color="action" fontSize="small" />
      </Tooltip>
    </Grid>
  );
};

TableItem.propTypes = {
  table: PropTypes.object,
};

export default TableItem;
