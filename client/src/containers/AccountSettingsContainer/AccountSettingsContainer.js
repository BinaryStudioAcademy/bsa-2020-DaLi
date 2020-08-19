import React, { useState } from 'react';
import { Avatar, Grid, Typography, Tab, Tabs, Box, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage, getIn } from 'formik';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateUser, hideUserUpdateMessage, updateUserError } from './actions';

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
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
      'Password must contain one uppercase, one number and one special character.'
    )
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  newPassword: Yup.string()
    .max(30)
    .required('Required')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
      'Password must contain one uppercase, one number and one special character.'
    )
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  confirmedPassword: Yup.string()
    .max(30)
    .required('Required')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
      'Password must contain one uppercase, one number and one special character.'
    )
    .min(8, 'Password is too short - should be 8 chars minimum.'),
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
  hideUserUpdateMessage,
  isNotification,
  notificationMessage,
  notificationMessageStatus,
  updateUserError,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const classes = useStyles();
  const userInitials = getUserInitials(mockProfile);
  const initialPasswordValues = {
    currentPassword: '',
    newPassword: '',
    confirmedPassword: '',
  };

  const handleTabChange = (_event, tabIndex) => {
    setActiveTab(tabIndex);
  };

  const updateData = async (data) => {
    await updateUser({ id, data });
  };

  const onSaveClick = ({ currentPassword, newPassword, confirmedPassword }) => {
    if (newPassword !== confirmedPassword) {
      updateUserError({ message: "New password and confirm new password doesn't match" });
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
              {({ errors, touched, isValid, dirty }) => (
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
                  <button type="submit" className={`btn btn-submit ${classes.update}`} disabled={!(isValid && dirty)}>
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
              {({ errors, touched, isValid, dirty }) => (
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
                  <button type="submit" className={`btn btn-submit ${classes.save}`} disabled={!(isValid && dirty)}>
                    Save
                  </button>
                </Form>
              )}
            </Formik>
          </Typography>
        </Box>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={isNotification}
          autoHideDuration={6000}
          onClose={hideUserUpdateMessage}
        >
          <Alert elevation={6} variant="filled" severity={notificationMessageStatus} onClose={hideUserUpdateMessage}>
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
  notificationMessage: PropTypes.string,
  notificationMessageStatus: PropTypes.string,
  updateUser: PropTypes.func,
  hideUserUpdateMessage: PropTypes.func,
  updateUserError: PropTypes.func,
  isNotification: PropTypes.bool,
};

const mapStateToProps = ({ currentUser, accountSettingsReducer }) => ({
  email: currentUser.user.email,
  firstName: currentUser.user.firstName,
  lastName: currentUser.user.lastName,
  id: currentUser.user.id,
  notificationMessage: accountSettingsReducer.updateUserMessage,
  notificationMessageStatus: accountSettingsReducer.updateUserStatus,
  isNotification: accountSettingsReducer.isUpdateUserNotification,
});

const mapDispatchToProps = {
  updateUser,
  hideUserUpdateMessage,
  updateUserError,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettingsContainer);
