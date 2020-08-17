import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import DatabaseListItem from './DatabaseListItem';
import DatabaseListHeader from '../DatabaseListHeader/DatabaseListHeader';
import { useStyles } from './styles';

import { mockDatabase } from './mockDatabase';

const DatabaseList = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <DatabaseListHeader />
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Engine</TableCell>
              <TableCell align="left">&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockDatabase.map((database) => (
              // eslint-disable-next-line
              <DatabaseListItem database={database} key={database.id} onDelete={(id) => alert(id)} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

DatabaseList.propTypes = {};

export default DatabaseList;
