import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Button } from '@material-ui/core';
import { useStyles } from './styles';

const DatabaseListItem = ({ database: { id, dbNickname, type }, onDelete }) => {
  const classes = useStyles();

  return (
    <>
      <TableRow className={classes.tableRow}>
        <TableCell align="left" className={classes.databaseName}>
          <div className={classes.item}>{dbNickname}</div>
        </TableCell>
        <TableCell align="left">{type}</TableCell>
        <TableCell align="right">
          <Button className={classes.deleteButton} onClick={() => onDelete(id)}>
            Delete
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

DatabaseListItem.propTypes = {
  database: PropTypes.object,
  onDelete: PropTypes.func,
};

export default DatabaseListItem;
