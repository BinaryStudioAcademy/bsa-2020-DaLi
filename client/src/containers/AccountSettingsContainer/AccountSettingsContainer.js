import React, { useState, useEffect } from 'react';
import { Avatar, Grid, Typography, Tab, Tabs, Box, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage, getIn } from 'formik';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateUser, logout } from '../LoginPageContainer/actions';

import { mockProfile, getUserInitials } from './helper';

import useStyles from './styles';

const ProfileSchema = Yup.object().shape({
  firstName: Yup.string().max(30).required('Required'),
  lastName: Yup.string().max(30).required('Required'),
  email: Yup.string().max(30).email('Invalid email').required('Required'),
});

const PasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .max(30)
    .required('Required')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Password must contain one uppercase, one lowercase, one number and one special character.'
    ),
  newPassword: Yup.string()
    .max(30)
    .required('Required')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Password must contain one uppercase, one lowercase, one number and one special character.'
    ),
  confirmedPassword: Yup.string()
    .max(30)
    .required('Required')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Password must contain one uppercase, one lowercase, one number and one special character.'
    ),
});

const getStyles = (errors, touched, fieldName) => {
  return getIn(errors, fieldName) && getIn(touched, fieldName) ? { border: '1px solid red' } : {};
};

const AccountSettingsContainer = ({
  email,
  firstName,
  lastName,
  id,
  updateUser,
  notificationMessage: notificationMessageProps,
  notificationMessageStatus: notificationMessageStatusProps,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const classes = useStyles();
  const userInitials = getUserInitials(mockProfile);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [notificationMessageStatus, setNotificationMessageStatus] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const initialPasswordValues = {
    currentPassword: '',
    newPassword: '',
    confirmedPassword: '',
  };

  const displayNotification = () => setIsNotificationVisible(true);
  const hideNotification = () => setIsNotificationVisible(false);

  const updateNotification = (message, messageStatus) => {
    setNotificationMessage(message);
    setNotificationMessageStatus(messageStatus);
    if (message) {
      displayNotification();
    }
  };

  useEffect(() => {
    updateNotification(notificationMessageProps, notificationMessageStatusProps);
  }, [notificationMessageStatusProps, notificationMessageProps]);

  const handleTabChange = (_event, tabIndex) => {
    setActiveTab(tabIndex);
  };

  const updateData = async (data) => {
    await updateUser({ id, data });
    displayNotification();
  };

  const onSaveClick = ({ currentPassword, newPassword, confirmedPassword }) => {
    if (newPassword !== confirmedPassword) {
      updateNotification("New password and confirm new password doesn't match", 'error');
    } else {
      updateData({ oldPassword: currentPassword, password: newPassword });
    }
  };

  const onUpdateClick = (data) => {
    updateData(data);
  };

  return (
    <Grid className={classes.accountSettingsContainer} container direction="column">
      <Grid className={classes.accountSettingsHeader} item container direction="column" alignItems="center">
        <Avatar className={classes.accountSettingsAvatar}>{userInitials}</Avatar>
        <Typography className={classes.accountSettingsTitle}> Account settings </Typography>
        <Tabs
          classes={{
            root: classes.accountSettingsTabs,
            indicator: classes.accountSettingsTabsIndicator,
          }}
          value={activeTab}
          onChange={handleTabChange}
        >
          <Tab
            classes={{
              root: classes.accountSettingsTab,
              selected: classes.accountSettingsTabSelected,
            }}
            label="Profile"
          />
          <Tab
            classes={{
              root: classes.accountSettingsTab,
              selected: classes.accountSettingsTabSelected,
            }}
            label="Password"
          />
        </Tabs>
      </Grid>
      <Grid className={classes.accountSettingsContent} xs item container direction="column" alignItems="center">
        <Box className={classes.accountSettingsTabPanel} hidden={activeTab !== 0}>
          <Typography component="span">
            <Formik
              initialValues={{ email, firstName, lastName }}
              validationSchema={ProfileSchema}
              onSubmit={(values) => onUpdateClick(values)}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className={classes.relative}>
                    <label htmlFor="firstName" className={classes.label}>
                      First name
                    </label>
                    <Field
                      type="text"
                      name="firstName"
                      id="firstName"
                      className={` textInput ${classes.field}`}
                      style={getStyles(errors, touched, 'firstName')}
                    />
                    <ErrorMessage name="firstName" component="div" className={classes.error} />
                  </div>
                  <div className={classes.relative}>
                    <label htmlFor="lastName" className={classes.label}>
                      Last name
                    </label>
                    <Field
                      type="text"
                      name="lastName"
                      id="lastName"
                      className={` textInput ${classes.field}`}
                      style={getStyles(errors, touched, 'lastName')}
                    />
                    <ErrorMessage name="lastName" component="div" className={classes.error} />
                  </div>
                  <div className={classes.relative}>
                    <label htmlFor="email" className={classes.label}>
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className={` textInput ${classes.field}`}
                      style={getStyles(errors, touched, 'email')}
                    />
                    <ErrorMessage name="email" component="div" className={classes.error} />
                  </div>
                  <button type="submit" className={`btn btn-submit ${classes.update}`}>
                    Update
                  </button>
                </Form>
              )}
            </Formik>
          </Typography>
        </Box>
        <Box className={classes.accountSettingsTabPanel} hidden={activeTab !== 1}>
          <Typography component="span">
            <Formik
              initialValues={{ ...initialPasswordValues }}
              validationSchema={PasswordSchema}
              onSubmit={(values) => onSaveClick(values)}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className={classes.relative}>
                    <label htmlFor="currentPassword" className={classes.label}>
                      CurrentPassword
                    </label>
                    <Field
                      type="password"
                      name="currentPassword"
                      id="currentPassword"
                      placeholder="Shhh..."
                      className={` textInput ${classes.field}`}
                      style={getStyles(errors, touched, 'currentPassword')}
                    />
                    <ErrorMessage name="currentPassword" component="div" className={classes.error} />
                  </div>
                  <div className={classes.relative}>
                    <label htmlFor="newPassword" className={classes.label}>
                      Create a password
                    </label>
                    <Field
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      placeholder="Shhh..."
                      className={` textInput ${classes.field}`}
                      style={getStyles(errors, touched, 'newPassword')}
                    />
                    <ErrorMessage name="newPassword" component="div" className={classes.error} />
                  </div>
                  <div className={classes.relative}>
                    <label htmlFor="confirmedPassword" className={classes.label}>
                      Confirm your password
                    </label>
                    <Field
                      type="password"
                      name="confirmedPassword"
                      id="confirmedPassword"
                      placeholder="Shhh..."
                      className={` textInput ${classes.field}`}
                      style={getStyles(errors, touched, 'confirmedPassword')}
                    />
                    <ErrorMessage name="confirmedPassword" component="div" className={classes.error} />
                  </div>
                  <button type="submit" className="btn btn-submit">
                    Save
                  </button>
                </Form>
              )}
            </Formik>
          </Typography>
        </Box>
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
      </Grid>
    </Grid>
  );
};

AccountSettingsContainer.propTypes = {
  email: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  id: PropTypes.string,
  updateUser: PropTypes.func,
  notificationMessage: PropTypes.string,
  notificationMessageStatus: PropTypes.string,
};

const mapStateToProps = ({ currentUser }) => ({
  email: currentUser.user.email,
  firstName: currentUser.user.firstName,
  lastName: currentUser.user.lastName,
  id: currentUser.user.id,
  notificationMessage: currentUser.updateUserMessage,
  notificationMessageStatus: currentUser.updateUserStatus,
});

const mapDispatchToProps = {
  updateUser,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettingsContainer);
