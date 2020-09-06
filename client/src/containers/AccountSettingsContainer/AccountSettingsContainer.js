import React, { useState } from 'react';
import { Avatar, Grid, Typography, Tab, Tabs, Box, Snackbar, TextField, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage, getIn } from 'formik';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateUser, hideUserUpdateMessage, updateUserError } from './actions';

import { mockProfile, getUserInitials } from './helper';

import './styles.css';

const ProfileSchema = Yup.object().shape({
  firstName: Yup.string().max(30).required('Required'),
  lastName: Yup.string().max(30).required('Required'),
  email: Yup.string().max(30).email('Invalid email').required('Required'),
});

const PasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Required'),
  newPassword: Yup.string()
    .max(30)
    .required('Required')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[-!$%^&*()_+|~=:;<>?,#@.])[A-Za-z\d-!$%^&*()_+|~=:;<>?,#@.]{8,}$/,
      'Password must contain one uppercase, one lowercase, one number and one special character.'
    )
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  confirmedPassword: Yup.string()
    .required('Required')
    .test('passwords-match', 'The password and confirm password must match', function (value) {
      return this.parent.newPassword === value;
    }),
});

const getStyles = (errors, touched, fieldName) => {
  return getIn(errors, fieldName) && getIn(touched, fieldName)
    ? { borderRadius: '5px', backgroundColor: 'rgba(255, 0, 0, 0.3)' }
    : {};
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
    <Grid container direction="column">
      <Grid item container direction="column" alignItems="center">
        <Avatar style={{ margin: '15px 0' }}>{userInitials}</Avatar>
        <Typography variant="h3" color="textPrimary">
          Account settings
        </Typography>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Profile" />
          <Tab label="Password" />
        </Tabs>
      </Grid>
      <Grid xs item container direction="column" alignItems="center">
        <Box hidden={activeTab !== 0} className="edit-profile-form-wrapper">
          <Formik
            initialValues={{ email, firstName, lastName }}
            validationSchema={ProfileSchema}
            onSubmit={(values) => onUpdateClick(values)}
          >
            {({ errors, touched, isValid, dirty }) => (
              <Form className="edit-profile-form">
                <Typography variant="subtitle2" htmlFor="firstName">
                  First name
                </Typography>
                <Field
                  name="firstName"
                  as={TextField}
                  id="firstName"
                  variant="outlined"
                  style={getStyles(errors, touched, 'firstName')}
                />
                <ErrorMessage name="firstName" component="div" className="error" />
                <Typography variant="subtitle2" htmlFor="lastName">
                  Last name
                </Typography>
                <Field
                  name="lastName"
                  as={TextField}
                  id="lastName"
                  variant="outlined"
                  style={getStyles(errors, touched, 'lastName')}
                />
                <ErrorMessage name="lastName" component="div" className="error" />
                <Typography variant="subtitle2" htmlFor="email">
                  Email
                </Typography>
                <Field
                  name="email"
                  as={TextField}
                  id="email"
                  variant="outlined"
                  style={getStyles(errors, touched, 'email')}
                />
                <ErrorMessage name="email" component="div" className="error" />
                <div className="edit-profile-btn-container">
                  <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ marginTop: '25px' }}
                    disabled={!(isValid && dirty)}
                  >
                    Update
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Box>
        <Box hidden={activeTab !== 1} className="edit-profile-form-wrapper">
          <Formik
            initialValues={{ ...initialPasswordValues }}
            validationSchema={PasswordSchema}
            onSubmit={(values) => onSaveClick(values)}
          >
            {({ errors, touched, isValid, dirty }) => (
              <Form className="edit-profile-form">
                <Typography variant="subtitle2" htmlFor="currentPassword">
                  Current password
                </Typography>
                <Field
                  name="currentPassword"
                  as={TextField}
                  id="currentPassword"
                  type="password"
                  placeholder="Shhh..."
                  variant="outlined"
                  style={getStyles(errors, touched, 'currentPassword')}
                />
                <ErrorMessage name="currentPassword" component="div" className="error" />
                <Typography variant="subtitle2" htmlFor="newPassword">
                  Create a password
                </Typography>
                <Field
                  name="newPassword"
                  as={TextField}
                  id="newPassword"
                  type="password"
                  placeholder="Shhh..."
                  variant="outlined"
                  style={getStyles(errors, touched, 'newPassword')}
                />
                <ErrorMessage name="newPassword" component="div" className="error" />
                <Typography variant="subtitle2" htmlFor="confirmedPassword">
                  Confirm your password
                </Typography>
                <Field
                  name="confirmedPassword"
                  as={TextField}
                  id="confirmedPassword"
                  type="password"
                  placeholder="Shhh..."
                  variant="outlined"
                  style={getStyles(errors, touched, 'confirmedPassword')}
                />
                <ErrorMessage name="confirmedPassword" component="div" className="error" />
                <div className="edit-profile-btn-container">
                  <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ marginTop: '25px' }}
                    disabled={!(isValid && dirty)}
                  >
                    Save
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
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
