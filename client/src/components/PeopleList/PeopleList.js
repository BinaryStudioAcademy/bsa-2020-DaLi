import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import AddUserModal from '../AddUserModal';
import DeactivateUserModal from './DeactivateUserModal';
import PeopleListHeader from '../PeopleListHeader';
import { useStyles } from './styles';

import { mockPeople } from './mockPeople';
import PeopleTable from './PeopleTable';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const PeopleList = ({
  people = mockPeople,
  addUser,
  updateUser,
  toggleUserStatus,
  isLoading,
  message: notificationMessageProps,
  status: notificationMessageStatusProps,
}) => {
  const classes = useStyles();
  const [addUserModalVisible, setAddUserModalVisible] = useState(false);
  const [deactivateUserModalVisible, setDeactivateUserModalVisible] = useState(false);
  const [user, setUser] = React.useState(null);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [notificationMessageStatus, setNotificationMessageStatus] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isInactiveUsers, setIsInactiveUsers] = useState(false);
  const [inactiveUsers, setInactiveUsers] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const displayNotification = () => setIsNotificationVisible(true);
  const hideNotification = () => setIsNotificationVisible(false);



  useEffect(() => {
    const isDeactivatedUsers = people.filter((person) => !person.isActive).length > 0;
    setIsInactiveUsers(isDeactivatedUsers);

    if (isDeactivatedUsers) {
      setActiveUsers(people.filter((person) => person.isActive));
      setInactiveUsers(people.filter((person) => !person.isActive));
    }

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

  const hideDeactivateUserModal = () => {
    setDeactivateUserModalVisible(false);
  };

  const showAddUserModal = (person) => {
    setUser(person);
    setAddUserModalVisible(true);
  };

  const addUserHandler = () => {
    showAddUserModal(null);
  }

  const showDeactivateUserModal = (person) => {
    setUser(person);
    setDeactivateUserModalVisible(true);
  };

  return (
    <div className={classes.root}>
      {!isInactiveUsers ? (
        <>
          <PeopleListHeader addUser={addUser} />
          <PeopleTable
            active
            people={people}
            showAddUserModal={showAddUserModal}
            showDeactivateUserModal={showDeactivateUserModal}
          />
        </>
      ) : (
        <div className={classes.panel}>
          <div className={classes.appbar}>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" className={classes.tabs}>
              <Tab label="Active" className={classes.tab} />
              <Tab label="Deactivated" className={classes.tab} />
            </Tabs>
            <Button className={classes.addPersonButton} variant="contained" onClick={addUserHandler}>
              Add someone
            </Button>
          </div>
          <TabPanel value={value} index={0}>
            <PeopleTable
              active
              people={activeUsers}
              showAddUserModal={showAddUserModal}
              showDeactivateUserModal={showDeactivateUserModal}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PeopleTable
              active={false}
              people={inactiveUsers}
              showAddUserModal={showAddUserModal}
              showDeactivateUserModal={showDeactivateUserModal}
              toggleUserStatus={toggleUserStatus}
            />
          </TabPanel>
        </div>
      )}

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
        submitHandler={user ? updateUser : addUser}
        user={user}
      />
      <DeactivateUserModal
        isVisible={deactivateUserModalVisible}
        closeModal={hideDeactivateUserModal}
        confirmHandler={toggleUserStatus}
        user={user}
      />
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
  toggleUserStatus: PropTypes.func,
  isLoading: PropTypes.bool,
  message: PropTypes.string,
  status: PropTypes.string,
};

export default PeopleList;
