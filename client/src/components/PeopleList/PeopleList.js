import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import AddUserModal from '../AddUserModal';
import PeopleListHeader from '../PeopleListHeader';
import { useStyles } from './styles';

import { mockPeople } from './mockPeople';
import PeopleListItem from './PeopleListItem';
import PasswordModal from '../PasswordModal/PasswordModal';

const PeopleList = ({
  people = mockPeople,
  addUser,
  updateUser,
  isLoading,
  message: notificationMessageProps,
  status: notificationMessageStatusProps,
}) => {
  const classes = useStyles();
  const [addUserModalVisible, setAddUserModalVisible] = useState(false);
  const [user, setUser] = React.useState(null);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [notificationMessageStatus, setNotificationMessageStatus] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');

  const displayNotification = () => setIsNotificationVisible(true);
  const hideNotification = () => setIsNotificationVisible(false);

  useEffect(() => {
    const updateNotification = (message, messageStatus) => {
      setNotificationMessage(message);
      setNotificationMessageStatus(messageStatus);
      if (message) {
        displayNotification();
      }
    };

    updateNotification(notificationMessageProps, notificationMessageStatusProps);
  }, [notificationMessageStatusProps, notificationMessageProps]);

  const hideAddUserModal = () => {
    setAddUserModalVisible(false);
  };

  const showAddUserModal = (person) => {
    setUser(person);
    setAddUserModalVisible(true);
  };

  return (
    <div className={classes.root}>
      <PeopleListHeader addUser={addUser} />
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Groups</TableCell>
              <TableCell align="left">Last Login</TableCell>
              <TableCell align="left">&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {people.map((person) => (
              <PeopleListItem key={person.id} person={person} showAddUserModal={showAddUserModal} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isNotificationVisible}
        autoHideDuration={6000}
        onClose={hideNotification}
      >
        <Alert elevation={6} variant="filled" severity={notificationMessageStatus} onClose={hideNotification}>
          {notificationMessage}
        </Alert>
      </Snackbar>
      <AddUserModal
        isVisible={addUserModalVisible}
        closeModal={hideAddUserModal}
        submitHandler={updateUser}
        user={user}
      />
      <PasswordModal />
      {isLoading && (
        <Backdrop className={classes.backdrop} open>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </div>
  );
};
PeopleList.propTypes = {
  people: PropTypes.array,
  addUser: PropTypes.func,
  updateUser: PropTypes.func,
  isLoading: PropTypes.bool,
  message: PropTypes.string,
  status: PropTypes.string,
};

export default PeopleList;
