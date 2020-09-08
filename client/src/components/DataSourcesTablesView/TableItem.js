import React from 'react';
import PropTypes from 'prop-types';
import AppsIcon from '@material-ui/icons/Apps';
import { Paper, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const TableItem = ({ table }) => {
  const history = useHistory();

  const onTableClick = () => {
    history.push({
      pathname: '/select-visualization',
      state: { tableId: table.id },
    });
  };

  return (
    <Paper variant="outlined" square className="data-source-item table-item" onClick={() => onTableClick()}>
      <div className="paper-data-icon">
        <AppsIcon />
      </div>
      <div className="paper-data-text">
        <Typography variant="h3">{table.name}</Typography>
      </div>
    </Paper>
  );
};

TableItem.propTypes = {
  table: PropTypes.object,
};

export default TableItem;
