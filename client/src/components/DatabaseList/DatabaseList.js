import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import DatabaseListItem from './DatabaseListItem';
import DatabaseListHeader from '../DatabaseListHeader/DatabaseListHeader';
import DeleteDatabaseModal from '../DeleteDatabaseModal/DeleteDatabaseModal';
import { useStyles } from './styles';

import { mockDatabase } from './mockDatabase';

const DatabaseList = ({ deleteDatabase }) => {
  const classes = useStyles();
  const [deleteDbModalVisible, setDeleteDbModalVisible] = useState(false);
  const [databaseIdForDelete, setDatabaseIdForDelete] = useState(-1);

  const hideDeleteDbModal = () => {
    setDeleteDbModalVisible(false);
  };

  const showDeleteDbModal = (id) => {
    setDeleteDbModalVisible(true);
    setDatabaseIdForDelete(id);
  };

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
              <DatabaseListItem database={database} key={database.id} onDelete={(id) => showDeleteDbModal(id)} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteDatabaseModal
        isVisible={deleteDbModalVisible}
        closeModal={hideDeleteDbModal}
        deleteDatabase={deleteDatabase}
        databaseId={databaseIdForDelete}
      />
    </div>
  );
};

DatabaseList.propTypes = {
  deleteDatabase: PropTypes.func,
};

export default DatabaseList;
