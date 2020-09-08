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
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles';
import PeopleTable from './PeopleTable';
import PeopleListModal from '../PeopleListModal/PeopleListModal';

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

const PeopleList = ({
  people,
  toggleUserStatus,
  isLoading,
  membership,
  addUserToGroup,
  deleteUserFromGroup,
  message,
  status,
  resetNotification,
  currentUserId,
  openModal,
  activeTabIndex,
  setActiveTabIndex,
}) => {
  const classes = useStyles();
  const [isInactiveUsers, setIsInactiveUsers] = useState(false);
  const [inactiveUsers, setInactiveUsers] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);

  const handleChange = (event, newValue) => {
    setActiveTabIndex(newValue);
  };

  const hideNotification = () => {
    resetNotification();
  };

  useEffect(() => {
    const isDeactivatedUsers = people.filter((person) => !person.isActive).length > 0;
    setIsInactiveUsers(isDeactivatedUsers);

    if (isDeactivatedUsers) {
      setActiveUsers(people.filter((person) => person.isActive));
      setInactiveUsers(people.filter((person) => !person.isActive));
    }
  }, [people]);

  return (
    <>
      {isLoading && (
        <Backdrop className={classes.backdrop} open>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <div className={classes.root}>
        {!isInactiveUsers ? (
          <>
            <Grid className={classes.peopleListHeader}>
              <Typography className={classes.peopleListTitle}>People</Typography>
              <Button
                className={classes.addPersonButton}
                variant="contained"
                onClick={() => openModal({ type: 'Add user' })}
              >
                Add someone
              </Button>
            </Grid>
            <PeopleTable
              active
              people={people}
              membership={membership}
              addUserToGroup={addUserToGroup}
              deleteUserFromGroup={deleteUserFromGroup}
              currentUserId={currentUserId}
              openModal={openModal}
            />
          </>
        ) : (
          <div className={classes.panel}>
            <div className={classes.appbar}>
              <Tabs
                value={activeTabIndex}
                onChange={handleChange}
                aria-label="simple tabs example"
                className={classes.tabs}
              >
                <Tab label="Active" className={classes.tab} />
                <Tab label="Deactivated" className={classes.tab} />
              </Tabs>
              <Button
                className={classes.addPersonButton}
                onClick={() => openModal({ type: 'Add user' })}
                variant="contained"
              >
                Add someone
              </Button>
            </div>
            <TabPanel value={activeTabIndex} index={0}>
              <PeopleTable
                active
                people={activeUsers}
                membership={membership}
                addUserToGroup={addUserToGroup}
                deleteUserFromGroup={deleteUserFromGroup}
                currentUserId={currentUserId}
                openModal={openModal}
              />
            </TabPanel>
            <TabPanel value={activeTabIndex} index={1}>
              <PeopleTable
                active={false}
                people={inactiveUsers}
                membership={membership}
                addUserToGroup={addUserToGroup}
                deleteUserFromGroup={deleteUserFromGroup}
                toggleUserStatus={toggleUserStatus}
                currentUserId={currentUserId}
                openModal={openModal}
              />
            </TabPanel>
          </div>
        )}

        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={!!message}
          autoHideDuration={6000}
          transitionDuration={0}
          onClose={hideNotification}
        >
          <Alert elevation={6} variant="filled" severity={status} onClick={hideNotification}>
            {message}
          </Alert>
        </Snackbar>
        <PeopleListModal />
      </div>
    </>
  );
};

PeopleList.propTypes = {
  people: PropTypes.array,
  toggleUserStatus: PropTypes.func,
  isLoading: PropTypes.bool,
  message: PropTypes.string,
  status: PropTypes.string,
  membership: PropTypes.array,
  addUserToGroup: PropTypes.func,
  deleteUserFromGroup: PropTypes.func,
  resetNotification: PropTypes.func,
  openModal: PropTypes.func,
  currentUserId: PropTypes.string,
  activeTabIndex: PropTypes.number,
  setActiveTabIndex: PropTypes.func,
};

export default PeopleList;
