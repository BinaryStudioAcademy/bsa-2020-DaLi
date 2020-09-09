import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useStyles } from './styles';

const DatabaseListItem = ({ database: { id, dbNickname, type }, onDelete }) => {
  const classes = useStyles();

  return (
    <>
      <TableRow className={classes.tableRow}>
        <TableCell align="left" className={classes.databaseName}>
          <Link
            className={classes.item}
            to={{
              pathname: `/admin/databases/${id}`,
            }}
          >
            {dbNickname}
          </Link>
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
