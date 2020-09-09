import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Breadcrumbs, Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import DatabaseListItem from './DatabaseListItem';
import DatabaseListHeader from '../DatabaseListHeader/DatabaseListHeader';
import DeleteDatabaseModal from '../DeleteDatabaseModal/DeleteDatabaseModal';

const DatabaseList = ({ deleteDatabase, databases, isLoading }) => {
  const [deleteDbModalVisible, setDeleteDbModalVisible] = useState(false);
  const [databaseIdForDelete, setDatabaseIdForDelete] = useState('');

  const hideDeleteDbModal = () => {
    setDeleteDbModalVisible(false);
  };

  const showDeleteDbModal = (id) => {
    setDeleteDbModalVisible(true);
    setDatabaseIdForDelete(id);
  };

  return isLoading ? (
    <Backdrop style={{ color: '#fff', zIndex: 1 }} open>
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <div className="wrapper">
      <Breadcrumbs separator={<NavigateNextIcon />} aria-label="breadcrumb" style={{ marginTop: '10px' }}>
        <Typography variant="body2" color="primary">
          Databases
        </Typography>
      </Breadcrumbs>
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
            {databases.map((database) => (
              <DatabaseListItem database={database} key={database.id} onDelete={showDeleteDbModal} />
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
  databases: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default DatabaseList;
